const USE_FILES = true; // also update in app.js and widget.js
const ICON_WIDTH = 24;
const CLOCK_WIDTH = 48;

WIDGETS["cal-clock"]={
  area: "tl",
  showTime: !global.calClockUpdateHandler,
  showIcon: !global.calClockUpdateHandler && (USE_FILES ? require('Storage').readJSON('bang-messages.json',1) || [] : global.calClockMessages).length > 0,
  width: 0,
  t: Date.now(),
  setShowTime: function(value) {
    if (this.width) g.reset().clearRect(this.x, this.y, this.x+this.width-1, this.y+ICON_WIDTH-1);
    console.log("Show time: " + this.showTime + ' -> ' + value);
    if (this.showTime && !value) {
      this.width -= CLOCK_WIDTH;
      this.showTime = false;
    } else if (value && !this.showTime) {
      this.width += CLOCK_WIDTH;
      this.showTime = true;
    }
    console.log("Width = " + this.width, this.showTime, this.showIcon);
    Bangle.drawWidgets();
  },
  setShowIcon: function(value) {
    if (this.width) g.reset().clearRect(this.x, this.y, this.x+this.width-1, this.y+ICON_WIDTH-1);
    console.log("Show icon: " + this.showIcon + ' -> ' + value);
    if (this.showIcon && !value) {
      this.width -= ICON_WIDTH;
      this.showIcon = false;
    } else if (value && !this.showIcon) {
      this.width += ICON_WIDTH;
      this.showIcon = true;
      this.t = Date.now();
    }
    console.log("Width = " + this.width, this.showTime, this.showIcon);
    Bangle.drawWidgets();
  },
  draw: function() {
    console.log("Drawing: " + this.width, this.showTime, this.showIcon);
    const w = (this.showTime ? CLOCK_WIDTH : 0) + (this.showIcon ? ICON_WIDTH : 0);
    if (this.width != w) {
      this.width = w;
      console.log("Updating width")
      setTimeout(Bangle.drawWidgets);
      return;
    }
    // If we had a setTimeout queued from the last time we were called, remove it
    if (WIDGETS["cal-clock"].i) {
      clearTimeout(WIDGETS["cal-clock"].i);
      delete WIDGETS["cal-clock"].i;
    }
    Bangle.removeListener('touch', this.touch);
    if (!this.width) return;
    var c = (Date.now()-this.t)/1000;
    g.reset().clearRect(this.x, this.y, this.x+this.width-1, this.y+ICON_WIDTH-1);
    let interval = false;
    if (this.showTime) {
      interval = Date.now();
      interval -= interval % 60000;
      g.setColor(g.theme.fg);
      g.setFont("Vector", 16);
      g.setFontAlign(1, 0);
      const now = new Date(),
        hour = now.getHours(),
        min = now.getMinutes();
      g.drawString(
        (hour < 10 ? ' ' + hour : hour) + ':' + (min < 10 ? '0' + min : min),
        this.x + this.width - 1,
        13,
        true
      );
   } 
    if (this.showIcon) {
      g.drawImage((c&1) ? atob("GBiBAAAAAAAAAAAAAAAAAAAAAB//+DAADDAADDAADDwAPD8A/DOBzDDn/DA//DAHvDAPvjAPvjAPvjAPvh///gf/vAAD+AAB8AAAAA==") : atob("GBiBAAAAAAAAAAAAAAAAAAAAAB//+D///D///A//8CP/xDj/HD48DD+B8D/D+D/3vD/vvj/vvj/vvj/vvh/v/gfnvAAD+AAB8AAAAA=="), this.x, this.y);
      if (process.env.HWVERSION>1) Bangle.on('touch', this.touch);
      interval = 1000;
    }
    if (interval) WIDGETS["cal-clock"].i=setTimeout(() => WIDGETS["cal-clock"].draw(), interval);
  },
  touch:function(b,c) {
    var w=WIDGETS["cal-clock"];
    if (!w||!w.width||c.x<w.x||c.x>w.x+w.width||c.y<w.y||c.y>w.y+w.iconwidth) return;
    load("cal-clock.app.js");
  }
};
