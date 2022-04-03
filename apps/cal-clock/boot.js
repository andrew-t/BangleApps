(function() {
  // function gbSend(message) {
  //   Bluetooth.println("");
  //   Bluetooth.println(JSON.stringify(message));
  // }

  global.calClockMusicHandler = null;

  function updateCalClock() {
    if (!global.calClockMusicHandler) return;
    global.calClockMusicHandler(global.calClockMusicInfo, global.calClockMusicState);
  }

  global.clearCalClockMusic = () => {
    global.calClockMusicInfo = null;
    global.calClockMusicState = null;
    updateCalClock();
  };
  global.clearCalClockMusic();

  var _GB = global.GB;
  global.GB = (event) => {
    // feed a copy to other handlers if there were any
    if (_GB) setTimeout(_GB,0,Object.assign({},event));

    switch (event.t) {
      // {t:"musicstate", state:"play/pause",position,shuffle,repeat}
      case "musicstate":
        delete event.t;
        global.calClockMusicState = event;
        updateCalClock();
        return;
      // {t:"musicinfo", artist,album,track,dur,c(track count),n(track num}
      case "musicinfo":
        delete event.t;
        global.calClockMusicInfo = event;
        updateCalClock();
        return;
      // we only care about music events for now
      // todo -- this might be a good place to handle calendar events
      default: return;
    }
  };

  // Music control
  // Bangle.musicControl = cmd => {
  //   // play/pause/next/previous/volumeup/volumedown
  //   gbSend({ t: "music", n:cmd });
  // };
})();
