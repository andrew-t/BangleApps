const fs = require('Storage');

const font = atob("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");
const widths = atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY=");
Graphics.prototype.setFontDylex7x13 = function() {
  this.setFontCustom(font, 32, widths, 13);
};

// a dumb function that turns six-digit hex codes into ones the bangle displays nicely
// it errs on the side of darkness (relatable) because, idk, it looks good?
// can't be a gamma thing, the display is 1-bit dithered, but who knows, it seems to work
// also it's tuned to the google calendar palette all looking distinct more than accurate reproduction
function channel(n) { if (n > 0.7) return 'f'; if (n > 0.5) return '8'; return '0'; }
function gChannel(n) { if (n > 0.7) return 'f'; return '0'; }
function sanitiseColour(col) {
  const r = (col >> 4) & 0xf,
    g = (col >> 12) & 0xf,
    b = (col >> 20) & 0xf;
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

let showSeconds = !Bangle.isLocked();
let drawTimeout = null;

function clearTimeArea() {
  g.setColor(g.theme.bg);
  g.fillRect(0, 24, 176, 63);
}
function clearCalendarArea() {
  g.setColor(g.theme.bg);
  g.fillRect(0, 64, 176, 176);
}

global.depBoardRunning = true;
E.on('kill', () => { delete global.depBoardRunning; });
// Load widgets after setting depBoardRunning as our widget uses that to detect which app is running
Bangle.loadWidgets();
g.setBgColor(g.theme.bg);
g.clear();
Bangle.drawWidgets();

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

  if (drawTimeout) clearTimeout(drawTimeout);
  const interval = showSeconds ? 1000 : 60000;
  const wait = (interval - (now % interval)) || interval;
  drawTimeout = setTimeout(() => {
    drawTimeout = null;
    drawTime();
  }, wait);
}

drawTime();

Bangle.on('lcdPower', on => {
  showSeconds = on;
  drawTime();
});
Bangle.on('lock', on => {
  showSeconds = !on;
  drawTime();
});

function dateStr(ms) {
  const then = new Date(ms * 1000);
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][then.getDay()];
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][then.getMonth()];
  return day + ' ' + then.getDate() + ' ' + month;
}
function timeStr(event) {
  const d = new Date(event.timestamp * 1000);
  return d.getHours().toString().padStart(2, ' ') + ':'
    + d.getMinutes().toString().padStart(2, '0');
}

let calendar = [];
function loadCalendar() {
  calendar = fs.readJSON('android.calendar.json', 1)
    .map((event) => {
      event.color = sanitiseColour(event.color);
      return event
    })
    .sort((a, b) => a.timestamp - b.timestamp);
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

function startOfDay(ms) {
  return ms - (ms % 84600);
}

function timeTo(now, then) {
  const mins = (then - now) / 60;
  if (mins < 0) return 'NOW';
  if (mins < 1) return 'STARTING';
  if (mins < 60) return 'In ' + Math.floor(mins) + ' mins';
  return 'In ' + Math.floor(mins / 60) + 'h ' + Math.floor(mins % 60) + 'm';
}

function drawCalendar() {
  clearCalendarArea();
  g.setColor(g.theme.fg);
  const now = Date.now() / 1000;
  let day = dateStr(now);
  y = 64;
  drawStr(day, true, false);
  let first = true;
  let anyEventsToday = false;
  for (const event of calendar) {
    if (event.end < now) continue;
    const theDay = dateStr(event.timestamp);
    if (theDay != day && startOfDay(event.timestamp) >= startOfDay(now)) {
      if (!anyEventsToday) {
        drawStr("", false, false);
        drawStr("No events", true, false);
        drawStr("", false, false);
      }
      day = theDay;
      drawStr(day, true, false);
    }
    let actAsFirst = first && !event.allDay && event.timestamp - now < 10800;
    // don't treat events as importantly "next" if they've been going on for a bit
    if (actAsFirst && event.timestamp + 600 < now) actAsFirst = false;
    // // console.log('drawing event', event, actAsFirst);
    const title = event.title.trim();
    if (actAsFirst) {
      drawStr(
        timeTo(now, event.timestamp) + ' @ ' + timeStr(event).trim(),
        first && !event.allDay,
        event.colour || false
      );
      drawStr(title, first && !event.allDay, event.colour || false);
    } else {
      const when = event.allDay ? '' : timeStr(event);
      drawStr((when ? when + ': ' : '') + title, false, event.colour || true);
    }
    if (y > 176) return;
    anyEventsToday = true;
    if (actAsFirst) first = false;
  }
}

setInterval(loadCalendar, 900000); // every 15m
setInterval(drawCalendar, 60000); // Every minute
loadCalendar();
drawCalendar();

// Show launcher when middle button pressed
Bangle.setUI("clock");
