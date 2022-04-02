const STOPWATCH = 'sw',
  COUNTDOWN = 'cd';

function getDate(hours, minutes, seconds) {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + hours,
    now.getMinutes() + minutes,
    now.getSeconds() + seconds
  ).getTime();
}

function getZero() {
  if (settingsChronowid.pausedAt)
    return Date.now() + settingsChronowid.pausedAt;
  else switch(settingsChronowid.mode) {
    case STOPWATCH: return getDate(0, 0, 0);
    case COUNTDOWN: return getDate(settingsChronowid.hours, settingsChronowid.minutes, settingsChronowid.seconds - 0);
    default: return null;
  }
}

function updateSettings() {
  // console.log('storing settings', JSON.stringify(settingsChronowid));
  storage.writeJSON('chronowid.json', settingsChronowid);
  if (WIDGETS.chronowid) WIDGETS.chronowid.reload();
}

function getDisplayMilliseconds() {
  if (settingsChronowid.pausedAt) return Math.abs(settingsChronowid.pausedAt);
  if (settingsChronowid.zero) return Math.abs(Date.now() - settingsChronowid.zero);
  if (settingsChronowid.mode === COUNTDOWN)
    return ((settingsChronowid.hours * 60 + settingsChronowid.minutes) * 60 + settingsChronowid.seconds) * 1000;
  return 0;
}

function getDisplayTime() {
  const ms = Math.floor(getDisplayMilliseconds());
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  return h.toString().padStart(2,0) + ':' +
    (m % 60).toString().padStart(2,0) + ':' +
    (s % 60).toString().padStart(2,0) + '.' +
    (ms % 1000).toString().padStart(3,0);
}

function resetSettings() {
  settingsChronowid = {
    hours : 0,
    minutes : 0,
    seconds : 0,
    mode : null,
    zero : null,
    pausedAt : null,
  };
  updateSettings();
}

function goToNextScreen() {
  updateSettings();
  showCurrentScreen();
}

let elements = [];

function showMenu() {
  elements = [];
  return E.showMenu({
    '': { 'title': 'Set timer' },
    '< Back' : () => {
      E.showMenu(); // hide the menu
      goToNextScreen();
    },
    'Reset': () => resetSettings(),
    'Hours': {
      value: settingsChronowid.hours,
      min: 0,
      max: 24,
      step: 1,
      onchange: v => {
        settingsChronowid.hours = v;
        updateSettings();
      }
    },
    'Minutes': {
      value: settingsChronowid.minutes,
      min: 0,
      max: 59,
      step: 1,
      onchange: v => {
        settingsChronowid.minutes = v;
        updateSettings();
      }
    },
    'Seconds': {
      value: settingsChronowid.seconds,
      min: 0,
      max: 55,
      step: 5,
      onchange: v => {
        settingsChronowid.seconds = v;
        updateSettings();
      }
    },
  });
}

function updateElement(el) {
  g.setFontAlign(0, 0);
  g.setFont("Vector", 24);
  g.setBgColor(el.hl ? g.theme.bg2 : g.theme.bg);
  g.setColor(el.hl ? g.theme.fg2 : g.theme.fg);
  g.drawString(
    el.label(),
    el.x + el.w / 2,
    el.y + el.h / 2,
    true
  );
}

function drawElements() {
  // console.log('drawing els', getDisplayTime());
  for (const el of elements) {
    g.setColor(el.hl ? g.theme.bg2 : g.theme.bg);
    g.fillRect(el.x + 1, el.y + 1, el.x + el.w - 3, el.y + el.h - 3);
    updateElement(el);
  }
}

function setElements(els) {
  elements = els;
  drawElements();
}

Bangle.on("touch", (button, xy) => {
  // console.log('touch', JSON.stringify({ b: button, xy: xy, e: elements }));
  for (const el of elements)
    if (el.action && xy.x >= el.x && xy.y >= el.y && xy.x - el.x < el.w && xy.y - el.y < el.h) {
      // console.log('touched', el.label());
      el.action();
    }
});

let interval = null;
let timeout = null;

function showCurrentScreen() {
  // console.log('redrawing screen', JSON.stringify(settingsChronowid));

  g.setBgColor(g.theme.bg);
  g.clear();
  Bangle.loadWidgets();
  Bangle.drawWidgets();

  if (interval)  {
    // console.log('clearing interval');
    clearInterval(interval);
    interval = null;
  }
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  if (!settingsChronowid.mode) {
    setElements([
      {
        x: 0, w: 176, y: 24, h: 76,
        label: () => "Stopwatch",
        action: () => {
          settingsChronowid.mode = STOPWATCH;
          goToNextScreen();
        },
        hl: true
      }, {
        x: 0, w: 176, y: 100, h: 76,
        label: () => "Countdown",
        action: () => {
          settingsChronowid.mode = COUNTDOWN;
          goToNextScreen();
        },
        hl: true
      }
    ]);
    // close the app if you hang on this screen for 30s
    timeout = setTimeout(() => load(), 30000);
    return;
  }

  const timerElement = {
    x: 0, w: 176, y: 24, h: 76,
    label: () => getDisplayTime(),
    hl: false
  };

  const elements = [timerElement];

  if (settingsChronowid.zero) {
    elements.push({
      x: 0, w: 176, y: 100, h: 76,
      label: () => "Pause",
      action: () => {
        settingsChronowid.pausedAt = settingsChronowid.zero - Date.now();
        settingsChronowid.zero = null;
        goToNextScreen();
      },
      hl: true
    });
    setElements(elements);
    // console.log('setting interval');
    interval = setInterval(() => updateElement(timerElement), 63);
    return;
  } else
    elements.push({
      x: 88, w: 88, y: 100, h: 76,
      label: () => "Start",
      action: () => {
        settingsChronowid.zero = getZero();
        settingsChronowid.pausedAt = null;
        goToNextScreen();
      },
      hl: true
    });

  if (settingsChronowid.pausedAt) {
    elements.push({
      x: 0, w: 88, y: 100, h: 76,
      label: () => "Reset",
      action: () => {
        settingsChronowid.zero = null;
        settingsChronowid.pausedAt = null;
        goToNextScreen();
      },
      hl: true
    });
    setElements(elements);
    return;
  }

  elements.push({
    x: 0, w: 88, y: 100, h: 76,
    label: () => "Mode",
    action: () => {
      settingsChronowid.zero = null;
      settingsChronowid.pausedAt = null;
      settingsChronowid.mode = null;
      goToNextScreen();
    },
    hl: true
  });

  if (settingsChronowid.mode == COUNTDOWN)
    timerElement.action = () => showMenu();

  setElements(elements);
  return;
}


///////   //     //  ///    //
//    //  //     //  ////   //
//    //  //     //  /////  //
///////   //     //  // /// //
//    //  //     //  //  /////
//    //  //     //  //   ////
//    //   ///////   //    ///

// Close the app when you press the button
// TODO - make this optional in settings
// TODO - add settings
setWatch(() => load(), BTN1);

// Load the settings
const storage = require('Storage');
let settingsChronowid;

// Initialise settings
settingsChronowid = storage.readJSON('chronowid.json', 1);
if (!settingsChronowid) resetSettings();

// Save settings on quit
E.on('kill', () => updateSettings());

// Show the UI
showCurrentScreen();
