exports.push = function(body) {
  console.log("got calendar update", body);
   const events = body.split('^^^')
     .map(x => {
       const i = x.indexOf(', ');
       const times = x.substr(0, i).split('-').map(x => parseInt(x, 10) * 1000);
       const allDay = x[i + 2] == 'y';
       const title = x.substr(i + (isAllDay ? 7 : 6));
       return { start: times[0], end: times[1], allDay: allDay, title: title };
     });
  require("Storage").writeJSON("calendar-2d.json", events);
};
