const font = atob("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");
const widths = atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY=");
Graphics.prototype.setFontDylex7x13 = function() {
  this.setFontCustom(font, 32, widths, 13);
};

let showSeconds = false;
let calendar = [];

function clearScreen() {
  g.setBgColor(g.theme.bg);
  g.clear();
  Bangle.loadWidgets();
  Bangle.drawWidgets();
}
function clearCalendarArea() {
  g.setColor(g.theme.bg);
  g.fillRect(0, 64, 176, 176);
}

let loadCalendarInterval = null, drawCalendarInterval = null;
// only call this from enableCalendar: 
function loadCalendar() {
  calendar = require('Storage').readJSON('calendar-2d.json', true) || [];
  if (drawCalendarInterval) clearInterval(drawCalendarInterval);
  drawCalendarInterval = setInterval(drawCalendar, 60000);
  drawCalendar();
}
// functions to enter (or refresh) and leave calendar mode
function enableCalendar() {
  if (loadCalendarInterval) clearInterval(loadCalendarInterval);
  loadCalendarInterval = setInterval(loadCalendar, 900000); // every 15m
  loadCalendar();
}
function disableCalendar() {
  if (loadCalendarInterval) clearInterval(loadCalendarInterval);
  if (drawCalendarInterval) clearInterval(drawCalendarInterval);
  clearCalendarArea();
}

function enableMusic() {
  drawMusic();
}
function disableMusic() {
  clearCalendarArea();
}

function enableCalendarOrMusic() {
  if (global.calClockMusicState && global.calClockMusicState.state != 'stop') {
    disableCalendar();
    enableMusic();
    return;
  }
  disableMusic();
  enableCalendar();
}

// switch mode or update screen when music state changes
global.calClockMusicHandler = enableCalendarOrMusic;
// unregister listener when the app closes
E.on('kill', () => global.calClockMusicHandler = null);

function drawMusic() {
  clearCalendarArea();
  const state = global.calClockMusicState;
  const info = global.calClockMusicInfo;
  g.setColor(g.theme.fg);
  g.setFont("Dylex7x13");
  g.setFontAlign(-1, -1);
  if (info) {
    g.drawString(info.artist, 0, 64);
    g.drawString(info.track, 0, 77);
    g.drawString(info.album, 0, 90);
    g.drawString(info.dur + ' - ' + info.n + '/' + info.c, 0, 103);
  }
  else {
    g.drawString("no song", 0, 64);
  }
  if (state) {
    g.drawString(info.state, 0, 120);
    g.drawString('pos: ' + info.position, 0, 133);
    g.drawString('shuffle: ' + info.shuffle, 0, 146);
    g.drawString('repeat: ' + info.repeat, 0, 159);
  } else {
    g.drawString("no state", 0, 120);
  }
}

function drawTime() {
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

function drawCalendar() {
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
      g.setFontAlign(centre ? 0 : -1, -1);
      g.drawString(txt, centre ? 88 : 1, y + 1);
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
      anyEventsToday = true;
    }
    let actAsFirst = first && !event.isAllDay && event.start - now < 10800000;
    // don't treat events as importantly "next" if they've been going on for a bit
    if (actAsFirst && event.start + 600000 < now) actAsFirst = false;
    // console.log('drawing event', event, actAsFirst);
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

enableCalendarOrMusic();
clearScreen();
setShowSeconds(!Bangle.isLocked());

// Register hooks for LCD on/off event and screen lock on/off event
Bangle.on('lcdPower', on => setShowSeconds(on));
Bangle.on('lock', on => {
  if (!on) enableCalendarOrMusic();
  setShowSeconds(!on);
});

// Show launcher when middle button pressed
Bangle.setUI("clock");
