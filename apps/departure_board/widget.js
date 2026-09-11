WIDGETS["cal-clock"]={
  area: "tl",
  showTime: !global.depBoardRunning,
  width: 48,
  t: Date.now(),
  draw: function() {
    // If we had a setTimeout queued from the last time we were called, remove it
    if (WIDGETS["cal-clock"].i) {
      clearTimeout(WIDGETS["cal-clock"].i);
      delete WIDGETS["cal-clock"].i;
    }
    Bangle.removeListener('touch', this.touch);
    var c = (Date.now()-this.t)/1000;
    g.reset().clearRect(this.x, this.y, this.x+this.width-1, this.y+15);
    WIDGETS["cal-clock"].i = setTimeout(
      () => WIDGETS["cal-clock"].draw(),
      60000 - (Date.now() % 60000)
    );
    g.setColor(g.theme.fg);
    g.setFont("Vector", 16);
    g.setFontAlign(1, 0);
    const now = new Date();
    g.drawString(
	  now.getHours().toString().padStart(2, ' ') + ':' + now.getMinutes().toString().padStart(2, '0'),
      this.x + this.width - 1,
      13,
      true
    );

  },
  touch:function(b,c) {
    var w=WIDGETS["cal-clock"];
    if (!w||!w.width||c.x<w.x||c.x>w.x+w.width||c.y<w.y||c.y>w.y+w.iconwidth) return;
    load("cal-clock.app.js");
  }
};
