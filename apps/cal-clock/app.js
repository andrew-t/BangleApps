const font = atob("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");
const widths = atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY=");
Graphics.prototype.setFontDylex7x13 = function() {
  this.setFontCustom(font, 32, widths, 13);
};

let showSeconds = false;
let calendar = [];

const CALENDAR = 'cal',
  MUSIC = 'media';
let mode = null;

function clearScreen() {
  // console.log('clearing screen');
  g.setBgColor(g.theme.bg);
  g.clear();
  Bangle.loadWidgets();
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
  calendar = require('Storage').readJSON('calendar-2d.json', true) || [];
  if (drawCalendarInterval) clearInterval(drawCalendarInterval);
  drawCalendarInterval = setInterval(drawCalendar, 60000);
  drawCalendar();
}
// functions to enter (or refresh) and leave calendar mode
function enableCalendar() {
  // console.log('calendar mode!');
  mode = CALENDAR;
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
  musicMenuOpen = false;
  drawMusic();
}
function disableMusic() {
  mode = null;
  clearCalendarArea();
}

function enableCalendarOrMusic() {
  const state = global.calClockMusicState;
  if (!state || state.state == 'stop') {
    disableMusic();
    enableCalendar();
    return;
  }
  if (state.state == 'play') {
    disableCalendar();
    enableMusic();
    return;
  }
  if (mode == MUSIC) drawMusic();
}

// switch mode or update screen when music state changes
global.calClockMusicHandler = enableCalendarOrMusic;
// unregister listener when the app closes
E.on('kill', () => global.calClockMusicHandler = null);

let musicMenuOpen;
function drawMusic() {
  clearCalendarArea();
  const state = global.calClockMusicState;
  const info = global.calClockMusicInfo;
  // console.log('musicstate', state, info)
  if (musicMenuOpen) {
    g.setColor(g.theme.bg2);
    g.fillRect(0, 64, 57, 118);
    g.fillRect(59, 64, 116, 118);
    g.fillRect(118, 64, 175, 118);
    g.fillRect(0, 120, 57, 176);
    g.fillRect(59, 120, 116, 176);
    g.fillRect(118, 120, 175, 176);
    g.setColor(g.theme.fg);
    g.setFont("Vector", 24);
    g.setFontAlign(0, 0);
    g.drawString("V+", 30, 92);
    // g.drawString("|<", 89, 92);
    g.fillPolyAA([
      98, 82,
      88, 92,
      98, 102,
    ]);
    g.fillRect(81, 82, 85, 102);
    // g.drawString(">", 148, 92);
    g.fillPolyAA([
      138, 82,
      158, 92,
      138, 102,
    ]);
    g.drawString("V-", 30, 148);
    // g.drawString("STOP", 89, 148);
    g.fillRect(79, 138, 99, 158);
    // g.drawString("<-", 148, 148);
    g.drawPolyAA([
      148, 138,
      138, 148,
      148, 158,
    ]);
    g.drawPolyAA([
      138, 148,
      158, 148,
    ]);
    return;
  }
  g.setColor(g.theme.fg);
  g.setFont("Vector", 16);
  if (info) {
    centreText(info.artist || "Unknown artist", 64);
    centreText(info.track || "Unknown track", 80);
    centreText(info.album || "Unknown album", 96);
    // g.drawString(info.dur + ' - ' + info.n + '/' + info.c, 0, 103);
  }
  else {
    centreText("No song information", 77);
  }
  // if (state) {
  //   g.setFont("Dylex7x13");
  //   g.setFontAlign(-1, -1);
  //   g.drawString(state.state, 0, 120);
  //   g.drawString('pos: ' + state.position, 0, 133);
  //   g.drawString('shuffle: ' + state.shuffle, 0, 146);
  //   g.drawString('repeat: ' + state.repeat, 0, 159);
  // } else {
  //   g.drawString("no state", 0, 120);
  // }
  g.setColor(g.theme.bg2);
  g.fillRect(0, 120, 57, 176);
  g.fillRect(59, 120, 116, 176);
  g.fillRect(118, 120, 175, 176);
  g.setColor(g.theme.fg);
  g.setFont("Vector", 24);
  g.setFontAlign(0, 0);
  switch (state.state) {
    case 'play':
      g.fillRect(25, 138, 28, 158);
      g.fillRect(32, 138, 35, 158);
      break;
    case 'pause':
    case 'stop':
      g.fillPolyAA([
        20, 138,
        40, 148,
        20, 158,
      ]);
      break;
    default:
      g.fillPolyAA([
        16, 138,
        26, 148,
        16, 158,
      ]);
      g.fillRect(33, 138, 36, 158);
      g.fillRect(40, 138, 43, 158);
      break;
  }
  g.fillPolyAA([
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
  if (showSeconds) {
    time += ':' + now.getSeconds().toString().padStart(2, 0);
  }
  g.setFontAlign(0, 0);
  g.setFont("Vector", 36);
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, 176, 63);
  g.setColor(g.theme.fg);
  g.drawString(time, 88, 46);
  queueDrawTime();
}

function timeStr(event, now) {
  if (event.start < now) return "Now";
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

function centreText(txt, y) {
  const centre = g.stringWidth(txt) <= g.getWidth();
  g.setFontAlign(centre ? 0 : -1, -1);
  g.drawString(txt, centre ? 88 : 1, y + 1);
}

function drawCalendar() {
  // console.log('drawing calendar')
  let y = 64;
  clearCalendarArea();
  g.setColor(g.theme.fg);
  const now = Date.now();
  let day = dateStr(now);
  function drawStr(txt, big, hl) {
    if (txt) {
      const centre = (big && txt.length < 19) || (hl && txt.length < 30);
      g.setColor(hl ? g.theme.bg2 : g.theme.bg);
      if (big) g.setFont("Vector", 16);
      else g.setFont("Dylex7x13");
      g.fillRect(0, y, 176, y + (big ? 17 : 14));
      g.setColor(hl ? g.theme.fg2 : g.theme.fg);
      centreText(txt, y);
    }
    y += big ? 17 : 14;
  }
  drawStr(day, true, true);
  let first = true;
  let anyEventsToday = false;
  for (const event of calendar) {
    if ((event.isAllDay ? event.start + 84600000 : event.end) < now) continue;
    const theDay = dateStr(event.start);
    if (theDay != day && startOfDay(event.start) >= startOfDay(now)) {
      if (!anyEventsToday) {
        drawStr("", false, false);
        drawStr("No events", true, false);
        drawStr("", false, false);
      }
      day = theDay;
      drawStr(day, true, true);
    }
    let actAsFirst = first && !event.isAllDay && event.start - now < 10800000;
    // don't treat events as importantly "next" if they've been going on for a bit
    if (actAsFirst && event.start + 600000 < now) actAsFirst = false;
    // // console.log('drawing event', event, actAsFirst);
    const title = event.title.trim();
    const when = event.isAllDay ? '' : timeStr(event, now);
    if (actAsFirst) {
      drawStr(
        timeTo(now, event.start) + ' @ ' + when.trim(),
        first && !event.isAllDay,
        false
      );
      drawStr(title, first && !event.isAllDay, false);
    } else
      drawStr((when ? when + ': ' : '') + title, false, event.isAllDay);
    if (y > 176) return;
    anyEventsToday = true;
    if (actAsFirst) first = false;
  }
}

// todo - add this logic to chronowid:
let drawTimeout = null;
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
  drawTime();
}

clearScreen();
enableCalendarOrMusic();
setShowSeconds(!Bangle.isLocked());

// Register hooks for LCD on/off event and screen lock on/off event
Bangle.on('lcdPower', on => setShowSeconds(on));
Bangle.on('lock', on => {
  // console.log('lock toggled', on);
  if (!on) enableCalendarOrMusic();
  else if (mode == MUSIC && musicMenuOpen) {
    musicMenuOpen = false;
    drawMusic();
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
    enableMusic();
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
    global.clearCalClockMusic();
    disableMusic();
    enableCalendar();
    return;
  }
  musicMenuOpen = false;
  drawMusic();
  return;
});
