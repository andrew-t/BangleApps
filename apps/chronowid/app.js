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
  return timeToString(Math.floor(m / 60), m % 60, s % 60, ms % 1000);
}
function timeToString(h, m, s, ms) {
  const t = h.toString().padStart(2,0) + ':' +
    m.toString().padStart(2,0) + ':' +
    s.toString().padStart(2,0);
  if (ms == undefined) return t;
  return t + '.' + ms.toString().padStart(3,0);
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

function setTimer() {
  let newTime = '';
  g.setBgColor(g.theme.bg);
  g.clear();
  function timeFromString() {
    const x = '00000' + newTime;
    const seconds = parseInt(x.substr(x.length - 2), 10);
    const minutes = parseInt(x.substr(x.length - 4, 2), 10);
    const hours = parseInt(x.substr(0, x.length - 4), 10);
    return { hours: hours, minutes: minutes, seconds: seconds };
  }
  function type(d) {
    return () => {
      newTime += d;
      drawElements();
    };
  }
  setElements([
    {
      x: 0, y: 0, w: 176, h: 44,
      label: () => {
        const t = timeFromString();
        return timeToString(t.hours, t.minutes, t.seconds);
      },
      action: drawElements
    }, {
      x: 0, y: 44, w: 44, h: 44, hl: true,
      label: () => 7,
      action: type(7)
    }, {
      x: 44, y: 44, w: 44, h: 44, hl: true,
      label: () => 8,
      action: type(8)
    }, {
      x: 88, y: 44, w: 44, h: 44, hl: true,
      label: () => 9,
      action: type(9)
    }, {
      x: 0, y: 88, w: 44, h: 44, hl: true,
      label: () => 4,
      action: type(4)
    }, {
      x: 44, y: 88, w: 44, h: 44, hl: true,
      label: () => 5,
      action: type(5)
    }, {
      x: 88, y: 88, w: 44, h: 44, hl: true,
      label: () => 6,
      action: type(6)
    }, {
      x: 0, y: 132, w: 44, h: 44, hl: true,
      label: () => 1,
      action: type(1)
    }, {
      x: 44, y: 132, w: 44, h: 44, hl: true,
      label: () => 2,
      action: type(2)
    }, {
      x: 88, y: 132, w: 44, h: 44, hl: true,
      label: () => 3,
      action: type(3)
    }, {
      x: 132, y: 44, w: 44, h: 44, hl: true,
      label: () => newTime ? 'Del' : 'X',
      action: () => {
        if (newTime) {
          newTime = newTime.substr(0, newTime.length - 1);
          drawElements();
        }
        else showCurrentScreen();
      }
    }, {
      x: 132, y: 88, w: 44, h: 44, hl: true,
      label: () => 'OK',
      action: () => {
        Object.assign(settingsChronowid, timeFromString());
        goToNextScreen();
      }
    }, {
      x: 132, y: 132, w: 44, h: 44, hl: true,
      label: () => 0,
      action: type(0)
    }
  ]);
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
  const x = Math.min(xy.x, 175);
  const y = Math.min(xy.y, 175);
  for (const el of elements)
    if (el.action && x >= el.x && y >= el.y && x - el.x < el.w && y - el.y < el.h) {
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
    timerElement.action = () => setTimer();

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
