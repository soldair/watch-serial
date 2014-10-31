var test = require('tape');
var watch = require('../');

// this test assumes a device is connected.
test("can list",function(t){
  var s = watch(); 

  s.on('data',function(data){
    t.equals(data.event,"plug",'should have a device');
    console.log(data);
  
    s.end();
    t.end();

  })
});
