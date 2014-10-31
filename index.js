var through = require('through');
var sp = require('serialport');

module.exports = function(pollInterval){
  var s = through();

  var data = {};
  

  var ended = false;
  var first = true;

  var timer;

  pollInterval = pollInterval||2000;

  (function fn(){

    if(ended) return;

    var now = Date.now();
    sp.list(function(err,list){
      if(err) {
        s.emit("log",'failed to list serial ports',err);
        if(first) {
          // failed to list port on fisrt try. some permissions issue?
          return s.emit("error",err);
        }
      } else {

        first = false;

        s.emit('log','list',list);      

        // todo fill data emit diff.
        /* { comName: '/dev/ttyACM0',
            manufacturer: undefined,
            pnpId: 'usb-Pinoccio_Pinoccio_9533534303635191C0C1-if00' },
        */

        var found = {};
        list.forEach(function(device){
          var id = device.comName+'|'+device.manufacturer+'|'+device.pnpId;
          found[id] = 1;

          if(!data[id]){
            data[id] = device||{};
            s.queue({event:"plug",device:device,id:id});       
          }// can anything else happen? can i detect when a seial port is in use?
  
        });

        Object.keys(data).forEach(function(id){
          if(!found[id]) {
            var d = data[id];
            delete data[id];
            s.queue({event:"unplug",device:d,id:id});
          }
        })

      }

      timer = setTimeout(function watchSerialPollingLoop (){
        fn();
      },pollInterval-(Date.now()-now));

    })
  }())

  s.on('end',function(){
    ended = true;
    if(timer) timer.unref();
  });

  return s;
}
