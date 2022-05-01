const fs = require('Storage');

const font = atob("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");
const widths = atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY=");
Graphics.prototype.setFontDylex7x13 = function() {
  this.setFontCustom(font, 32, widths, 13);
};

// Boring internal state stuff
const USE_FILES = true; // also update in boot.js and widget.js
function getMessages() { return USE_FILES ? fs.readJSON('bang-messages.json',1) || [] : global.calClockMessages; }
function getMusic() { return USE_FILES ? fs.readJSON('bang-music.json',1) || [] : global.calClockMusic; }
function getCalendar() { return USE_FILES ? fs.readJSON('bang-calendar.json',1) || [] : global.calClockCalendar; }
let messages, music, calendar;
function loadState() {
  messages = getMessages();
  music = getMusic();
  calendar = getCalendar();
}
loadState();
function storeMessages(msg) {
  messages = msg;
  if (USE_FILES) fs.writeJSON('bang-messages.json', msg);
  else global.calClockMessages = msg;
}
function clearMusic() {
  global.clearCalClockMusic();
  music = { info: null, state: null };
}

// a dumb function that turns six-digit hex codes into ones the bangle displays nicely
// it errs on the side of darkness (relatable) because, idk, it looks good?
// can't be a gamma thing, the display is 1-bit dithered, but who knows, it seems to work
// also it's tuned to the google calendar palette all looking distinct more than accurate reproduction
function channel(n) { if (n > 0.7) return 'f'; if (n > 0.5) return '8'; return '0'; }
function gChannel(n) { if (n > 0.7) return 'f'; return '0'; }
function sanitiseColour(col) {
   const r = parseInt(col[1], 16), g = parseInt(col[3], 16), b = parseInt(col[5], 16);
   if (r < 4 && g < 4 && b < 4) return '#000';
   if (r > 12 && g > 12 && b > 12) return '#fff';
   const big = Math.max(r, g, b), small = Math.min(r, g, b), mid = r + g + b - big - small;
   if (big - small < 4) return '#fff'; // basically grey but text looks bad on #888
   if (big == g) return '#' + channel(r/g) + 'f' + channel(b/g); // text looks bad on #8 green, so it's #xfx
   if (big == r) {
     if (r > 0.7) return '#f' + gChannel(g/r) + channel(b/r);
     return '#80' + channel(b/(2*r));
   }
   if (b > 0.7) return '#' + channel(r/b) + gChannel(g/b) + 'f';
   return '#' + channel(r/(2*b)) + '08';
}

let showSeconds = false;
let drawTimeout = null;

const CALENDAR = 'cal', MUSIC = 'media', MESSAGES = 'msg';
let mode = null, preMessageMode = null;

const MESSAGE_TIMEOUT = 120000;

function clearScreen() {
  // console.log('clearing screen');
  g.setBgColor(g.theme.bg);
  g.clear();
  Bangle.drawWidgets();
}
function clearCalendarArea() {
  // console.log('clearing calendar area');
  g.setColor(g.theme.bg);
  g.fillRect(0, 64, 176, 176);
}

let loadCalendarInterval = null, drawCalendarInterval = null;

// only call this from enableCalendar: 
function loadCalendar() {
  // console.log('loading calendar')
  calendar = fs.readJSON('bang-calendar.json', true) || [];
  for (const e of calendar) e.colour = sanitiseColour(e.colour);
  if (drawCalendarInterval) clearInterval(drawCalendarInterval);
  drawCalendarInterval = setInterval(drawCalendar, 60000);
  drawCalendar();
}
// functions to enter (or refresh) and leave calendar mode
function enableCalendar() {
  // console.log('calendar mode!');
  mode = CALENDAR;
  enableTime();
  if (loadCalendarInterval) clearInterval(loadCalendarInterval);
  loadCalendarInterval = setInterval(loadCalendar, 900000); // every 15m
  loadCalendar();
}
function disableCalendar() {
  mode = null;
  if (loadCalendarInterval) clearInterval(loadCalendarInterval);
  if (drawCalendarInterval) clearInterval(drawCalendarInterval);
  clearCalendarArea();
}

function enableMusic() {
  // console.log('music mode!');
  mode = MUSIC;
  enableTime();
  musicMenuOpen = false;
  drawMusic();
}
function disableMusic() {
  mode = null;
  clearCalendarArea();
}

function enableTime() {
  // console.log('enable time');
  drawTime();
}
function clearTimeArea() {
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, 176, 63);
}
function disableTime() {
  // console.log('disable time');
  clearTimeArea();
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = null;
}

let messageTimeout = null;
function startMessageTimeout() {
  clearMessageTimeout();
  setTimeout(() => {
    messageTimeout = null;
    autoSelectModeNoMessages();
  }, MESSAGE_TIMEOUT);
}
function clearMessageTimeout() {
  if (messageTimeout) clearTimeout(messageTimeout);
}

function enableMessages() {
  // console.log('messages mode!');
  if (mode && mode != MESSAGES) preMessageMode = mode;
  mode = MESSAGES;
  disableTime();
  drawMessages();
  if (!Bangle.isLCDOn()) startMessageTimeout();
}
function disableMessages() {
  mode = null;
  clearCalendarArea();
}

function changeMode(newMode) {
  // console.log('mode switch', mode, newMode);
  if (mode != newMode) switch (mode) {
    case CALENDAR: disableCalendar(); break;
    case MUSIC: disableMusic(); break;
    case MESSAGES: disableMessages(); break;
    default: console.log('unexpected mode:', mode);
  }
  switch (newMode) {
    case CALENDAR: enableCalendar(); break;
    case MUSIC: enableMusic(); break;
    case MESSAGES: enableMessages(); break;
    default: console.log('unexpected newMode:', newMode);
  }
}

function autoSelectMode() {
  loadState();
  const messages = getMessages()
  // console.log('mode switch', messages, state);
  if (messages.length && messages[messages.length - 1].timestamp + MESSAGE_TIMEOUT > Date.now())
    changeMode(MESSAGES);
  else autoSelectModeNoMessages();
}
function autoSelectModeNoMessages() {
  // console.log('mode switch', messages, state);
  if (!music.state || music.state.state == 'stop')
    changeMode(CALENDAR);
  else if (music.state.state == 'play')
    changeMode(MUSIC);
  else if (mode == MUSIC)
    drawMusic();
}

// switch mode or update screen when state changes
global.calClockUpdateHandler = autoSelectMode;
// unregister listener when the app closes
E.on('kill', () => {
  global.calClockUpdateHandler = null;
});

// Load widgets after setting calClockUpdateHandler as our widget uses that to detect which app is running
Bangle.loadWidgets();
// WIDGETS["cal-clock"].setShowTime(false);
// WIDGETS["cal-clock"].setShowIcon(false);
// E.on('kill', () => {
// WIDGETS["cal-clock"].setShowTime(true);
// WIDGETS["cal-clock"].setShowIcon(getMessages().length > 0);
// });

let musicMenuOpen;
function drawMusic() {
  clearCalendarArea();
  // console.log('musicstate', state, info)
  if (musicMenuOpen) {
    g.setColor(g.theme.bg2);
    g.fillRect(0, 64, 57, 118);
    g.fillRect(59, 64, 116, 118);
    g.fillRect(118, 64, 175, 118);
    g.fillRect(0, 120, 57, 176);
    g.fillRect(59, 120, 116, 176);
    g.fillRect(118, 120, 175, 176);
    g.setColor(g.theme.fg2);
    g.setFont("Vector", 24);
    g.setFontAlign(0, 0);
    g.drawString("V+", 30, 92);
    // g.drawString("|<", 89, 92);
    g.fillPoly([
      98, 82,
      88, 92,
      98, 102,
    ]);
    g.fillRect(81, 82, 85, 102);
    // g.drawString(">", 148, 92);
    g.fillPoly([
      138, 82,
      158, 92,
      138, 102,
    ]);
    g.drawString("V-", 30, 148);
    // g.drawString("STOP", 89, 148);
    g.fillRect(79, 138, 99, 158);
    // g.drawString("<-", 148, 148);
    g.drawPoly([
      148, 138,
      138, 148,
      148, 158,
    ]);
    g.drawPoly([
      138, 148,
      158, 148,
    ]);
    return;
  }
  g.setColor(g.theme.fg);
  g.setFont("Vector", 16);
  if (music.info) {
    // TODO: this could be smarter at using space if (say) there's no album name or it's a podcast and the "artist" and "album" are the same
    centreText(music.info.artist || "Unknown artist", 64);
    centreText(music.info.track || "Unknown track", 80);
    centreText(music.info.album || "Unknown album", 96);
    // g.drawString(info.dur + ' - ' + info.n + '/' + info.c, 0, 103);
  }
  else centreText("No song information", 77);
  g.setColor(g.theme.bg2);
  g.fillRect(0, 120, 57, 176);
  g.fillRect(59, 120, 116, 176);
  g.fillRect(118, 120, 175, 176);
  g.setColor(g.theme.fg);
  g.setFont("Vector", 24);
  g.setFontAlign(0, 0);
  switch (music.state && music.state.state) {
    case 'play':
      g.fillRect(25, 138, 28, 158);
      g.fillRect(32, 138, 35, 158);
      break;
    case 'pause':
    case 'stop':
      g.fillPoly([
        20, 138,
        40, 148,
        20, 158,
      ]);
      break;
    default:
      g.fillPoly([
        16, 138,
        26, 148,
        16, 158,
      ]);
      g.fillRect(33, 138, 36, 158);
      g.fillRect(40, 138, 43, 158);
      break;
  }
  g.fillPoly([
    80, 138,
    90, 148,
    80, 158,
  ]);
  g.fillRect(93, 138, 96, 158);
  g.drawString("...", 148, 148);
}

function drawTime() {
  // console.log('drawing time')
  const now = new Date();
  let time = require('locale').time(now, 1).trim();
  if (showSeconds)
    time += ':' + now.getSeconds().toString().padStart(2, 0);
  clearTimeArea();
  g.setFontAlign(0, 0);
  g.setFont("Vector", 36);
  g.setColor(g.theme.fg);
  g.drawString(time, 88, 46);
  queueDrawTime();
}

function timeStrOrNow(event, now) {
  if (event.start < now) return "Now";
  return timeStr(event);
}

function timeStr(event) {
  const d = new Date(event.start);
  return d.getHours().toString().padStart(2, ' ') + ':'
    + d.getMinutes().toString().padStart(2, '0');
}

function dateStr(ms) {
  const then = new Date(ms);
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][then.getDay()];
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][then.getMonth()];
  return day + ' ' + then.getDate() + ' ' + month;
}

function timeTo(now, then) {
  const mins = (then - now) / 60000;
  if (mins < 0) return 'NOW';
  if (mins < 1) return 'STARTING';
  if (mins < 60) return 'In ' + Math.floor(mins) + ' mins';
  return 'In ' + Math.floor(mins / 60) + 'h ' + Math.floor(mins % 60) + 'm';
}

function startOfDay(ms) {
  return ms - (ms % 84600000);
}

function textFits(txt) {
  return g.stringWidth(txt) <= g.getWidth();
}

function centreText(txt, y) {
  const centre = textFits(txt);
  g.setFontAlign(centre ? 0 : -1, -1);
  g.drawString(txt, centre ? 88 : 1, y + 1);
}

let y = 64;
function drawStr(txt, big, hl, wrap) {
  if (!txt) {
    y += big ? 17 : 14;
    return;
  }
  if (big) g.setFont("Vector", 16);
  else g.setFont("Dylex7x13");
  if (wrap && !textFits(txt)) {
    const words = txt.split(' ');
    // console.log('wrapping', words);
    let line = words[0];
    for (let i = 1; i < words.length; ++i) {
      const newLine = line + ' ' + words[i];
      // console.log('wraptest', line, newLine);
      if (!textFits(newLine)) {
        // console.log('nope');
        drawStr(line, big, hl);
        line = words[i];
      } else line = newLine;
    }
    // console.log('done');
    drawStr(line, big, hl);
    return;
  }
  if (!hl) {
    g.setColor(g.theme.bg);
    g.fillRect(0, y, 176, y + (big ? 17 : 14));
    g.setColor(g.theme.fg);
  } else if (typeof hl == 'string') {
    g.setColor(hl);
    g.fillRect(0, y, 176, y + (big ? 17 : 14));
    g.setColor(hl[2] == 'f' ? '#000' : '#fff');
  } else {
    g.setColor(g.theme.bg2);
    g.fillRect(0, y, 176, y + (big ? 17 : 14));
    g.setColor(g.theme.fg2);
  }
  centreText(txt, y);
  y += big ? 17 : 14;
}

function drawCalendar() {
  // console.log('drawing calendar')
  clearCalendarArea();
  g.setColor(g.theme.fg);
  const now = Date.now();
  let day = dateStr(now);
  y = 64;
  drawStr(day, true, false);
  const messageCount = messages.length;
  if (messageCount) drawStr(messageCount + " notification" + (messageCount > 1 ? "s" : ""), false, '#800');
  let first = true;
  let anyEventsToday = false;
  for (const event of calendar) {
    if (event.end < now) continue;
    const theDay = dateStr(event.start);
    if (theDay != day && startOfDay(event.start) >= startOfDay(now)) {
      if (!anyEventsToday) {
        drawStr("", false, false);
        drawStr("No events", true, false);
        drawStr("", false, false);
      }
      day = theDay;
      drawStr(day, true, false);
    }
    let actAsFirst = first && !event.allDay && event.start - now < 10800000;
    // don't treat events as importantly "next" if they've been going on for a bit
    if (actAsFirst && event.start + 600000 < now) actAsFirst = false;
    // // console.log('drawing event', event, actAsFirst);
    const title = event.title.trim();
    if (actAsFirst) {
      drawStr(
        timeTo(now, event.start) + ' @ ' + timeStr(event).trim(),
        first && !event.allDay,
        event.colour || false
      );
      drawStr(title, first && !event.allDay, event.colour || false);
    } else {
      const when = event.allDay ? '' : timeStr(event, now);
      drawStr((when ? when + ': ' : '') + title, false, event.colour || true);
    }
    if (y > 176) return;
    anyEventsToday = true;
    if (actAsFirst) first = false;
  }
}

// todo - add this logic to chronowid:
function queueDrawTime() {
  if (drawTimeout) clearTimeout(drawTimeout);
  const interval = showSeconds ? 1000 : 60000;
  const now = Date.now();
  const wait = (interval - (now % interval)) || interval;
  drawTimeout = setTimeout(() => {
    drawTimeout = null;
    drawTime();
  }, wait);
}

function setShowSeconds(on) {
  showSeconds = on;
  if (drawTimeout) drawTime();
}

// Register hooks for LCD on/off event and screen lock on/off event
Bangle.on('lcdPower', on => setShowSeconds(on));
Bangle.on('lock', on => {
  if (on) {
    // when the watch locks
    if (mode == MESSAGES) startMessageTimeout();
    if (mode == MUSIC && musicMenuOpen) {
      musicMenuOpen = false;
      drawMusic();
    }
    autoSelectMode();
  } else {
    // when the user unlocks the watch
    clearMessageTimeout();
  }
  setShowSeconds(!on);
});

// Show launcher when middle button pressed
Bangle.setUI("clock");

// handle button presses in music mode
Bangle.on("touch", (button, xy) => {
  // console.log('touch', JSON.stringify({ b: button, xy: xy, e: elements }));
  if (mode == CALENDAR) {
    if (xy.y < 64) return;
    disableCalendar();
    if (messages.length) enableMessages();
    else enableMusic();
    return;
  }
  if (mode == MESSAGES) {
    if (xy.y < 120) {
      // todo - show full text if you press it?
      return;
    }
    if (xy.x < 59) {
      storeMessages([]);
      autoSelectMode();
      return;
    }
    const msg = messages.pop();
    storeMessages(messages);
    if (xy.x < 118) Bangle.messageResponse(msg, false);
    if (messages.length) enableMessages();
    else autoSelectMode();
    return;
  }
  if (mode != MUSIC) return;
  if (!musicMenuOpen) {
    if (xy.y < 64) return;
    if (xy.y < 120) {
      disableMusic();
      enableCalendar();
      return;
    }
    if (xy.x < 59) {
      Bangle.musicControl('playpause');
      return;
    }
    if (xy.x < 118) {
      Bangle.musicControl('next');
      return;
    }
    // console.log('menu button pressed')
    musicMenuOpen = true;
    drawMusic();
    return;
  }
  if (xy.y < 64) return;
  if (xy.y < 120) {
    if (xy.x < 59) {
      Bangle.musicControl('volumeup');
      return;
    }
    if (xy.x < 118) {
      Bangle.musicControl('previous');
      return;
    }
    Bangle.musicControl('play');
    return;
  }
  if (xy.x < 59) {
    Bangle.musicControl('volumedown');
    return;
  }
  if (xy.x < 118) {
    Bangle.musicControl('pause');
    Bangle.musicControl('stop');
    clearMusic();
    disableMusic();
    enableCalendar();
    return;
  }
  musicMenuOpen = false;
  drawMusic();
  return;
});

let knownMessages = 0;
function drawMessages() {
  console.log('drawing messages');
  if (messages.length > knownMessages) {
    // console.log('new message found');
    // override quiet mode while debugging
    var quiet = (fs.readJSON('setting.json',1)||{}).quiet;
    // const quiet = false;
    if (!quiet) Bangle.buzz();
  }
  knownMessages = messages.length;
  const messageToShow = messages[messages.length - 1];
  if (!messageToShow) {
    console.log("no message to show");
    // should never happen but to be safe
    storeMessages([]);
    autoSelectMode();
    return;
  }
  clearScreen();
  y = 24;
  g.setColor(g.theme.fg);
  // console.log(messageToShow);
  drawStr(messageToShow.src || "New message", true, true, true);
  if (messageToShow.title) drawStr(messageToShow.title, true, false, true);
  drawStr(messageToShow.body, false, false, true);
  // todo: buttons
  g.setColor(g.theme.bg);
  g.fillRect(0, 119, 176, 176);
  g.setColor(g.theme.bg2);
  g.fillRect(0, 120, 57, 176);
  g.fillRect(59, 120, 116, 176);
  g.fillRect(118, 120, 175, 176);
  g.setColor(g.theme.fg2);
  g.setFont("Vector", 24);
  g.setFontAlign(0, 0);
  g.drawString("X", 89, 148);
  g.drawString("Hide", 148, 148);
  g.setFont("Vector", 20);
  g.drawString("Done", 30, 139);
  g.drawString("(" + messages.length + ")", 30, 157);
}

// debug code
// global.calClockMessages = [{
//   id: -5,
//   src: 'Calendar Clock Test Nofification Service',
//   title: 'Test nofification',
//   body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
// }];
// // global.calClockUpdateHandler();

clearScreen();
autoSelectMode();
setShowSeconds(!Bangle.isLocked());
