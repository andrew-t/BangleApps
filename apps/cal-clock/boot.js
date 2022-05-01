(function() {
  // OK so my experience is that the Bangle battery lasts about five days,
  // during which time the battery goes from 100% to 37%,
  // and then it lasts another three hours or so.
  // Therefore, I'm going to hack the battery meter to report the last 37% as 5%
  // TODO: This should be its own tiny app but life's too short so it's here for now
  const eBat = E.getBattery;
  E.getBattery = () => {
    const realValue = eBat();
    return Math.round(realValue <= 37 ? realValue * 0.13513513513 : (realValue * 1.5873015873 - 58.73015873));
  };

  const fs = require("Storage");
  const USE_FILES = true; // also update in app.js and widget.js

  // function gbSend(message) {
  //   Bluetooth.println("");
  //   Bluetooth.println(JSON.stringify(message));
  // }

  if (!USE_FILES) {
    global.calClockUpdateHandler = null;
    global.calClockMessages = [];
    global.calClockMusic = { info: null, state: null };
  }

  function updateCalClock() {
    if (!global.calClockUpdateHandler) return;
    global.calClockUpdateHandler();
  }

  global.clearCalClockMusic = () => {
    if (USE_FILES) fs.writeJSON('bang-music.json', { info: null, state: null });
    else global.calClockMusicInfo = global.calClockMusicState = null;
    updateCalClock();
  };
  global.clearCalClockMusic();

  function getMessages() {
    return USE_FILES ? fs.readJSON('bang-messages.json',1) || [] : global.calClockMessages;
  }
  function storeMessages(messages) {
    if (USE_FILES) fs.writeJSON('bang-messages.json', messages);
    else global.calClockMessages = messages;
    updateCalClock();
  }
  
  function newMessage(event) {
    // var quiet = (require('Storage').readJSON('setting.json',1)||{}).quiet;
    event.timestamp = Date.now();
    const messages = getMessages();
    messages.push(event);
    storeMessages(messages);
    if (!global.calClockUpdateHandler) WIDGETS['cal-clock'].setShowIcon(true);
  }
  function updateMessage(event) {
    const messages = getMessages();
    for (const msg of messages)
      if (msg.id == event.id) {
        Object.assign(msg, event, { timestamp: Date.now() });
        storeMessages(messages);
        return;
      }
  }
  function deleteMessage(id) {
    storeMessages(getMessages().filter(m => m.id != id));
  }

  function getMusic() {
    return USE_FILES ? fs.readJSON('bang-music.json',1) || [] : global.calClockMusic;
  }
  function updateMusic(music) {
    if (USE_FILES) ? fs.writeJSON('bang-music.json', music);
    else global.calClockMusic = music;
    updateCalClock();
  }

  var _GB = global.GB;
  global.GB = (event) => {
    // feed a copy to other handlers if there were any
    if (_GB) setTimeout(_GB,0,Object.assign({},event));
    console.log("CCGB", event);

    // if (event.title == '@calendar@') {
    //   const calSync = require("calsync");
    //   if (calSync) {
    //     calSync.push(event.body);
    //     return;
    //   }
    // }

    const t = event.t;
    delete event.t;
    switch (t) {
      case "calendar":
        console.log("Received " + event.events.length + " calendar events");
        if (USE_FILES) fs.writeJSON("bang-calendar.json", event.events);
        else global.calClockEvents = event.events;
        console.log("Saved " + event.events.length + " calendar events");
        updateCalClock();
        return;
      case "ping":
        console.log(JSON.stringify({t:"pong", id:event.id}));
        return;
      // {t:"musicstate", state:"play/pause",position,shuffle,repeat}
      case "musicstate":
        const music = getMusic();
        music.state = event;
        updateMusic(music);
        return;
      // {t:"musicinfo", artist,album,track,dur,c(track count),n(track num}
      case "musicinfo":
        const music = getMusic();
        music.info = event;
        updateMusic(music);
        return;
      case "notify":
        newMessage(event);
        return;
      case "notify~":
        updateMessage(event);
        return;
      case "notify-":
        deleteMessage(event);
        return;
      case "call":
        if (event.cmd == 'incoming') newMessage({
          id: 'call',
          src: 'Phone',
          title: event.name || "Call",
          body: "Incoming call\n" + event.number
        });
        else deleteMessage('call');
        return;
      default: return;
    }
  };

  // Music control
  // Bangle.musicControl = cmd => {
  //   // play/pause/next/previous/volumeup/volumedown
  //   gbSend({ t: "music", n:cmd });
  // };
})();
