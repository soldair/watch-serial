watch-serial
------------

watch for new serial devices. stream with plug/unplg events. 

```js
var watch = require('watch-serial'); 

var stream = watch();

stream.on('data',console.log)

```

this will output something like this when a device is plugged then unplugged.

```

{ event: 'plug',
  device: 
   { comName: '/dev/ttyACM1',
     manufacturer: undefined,
     pnpId: 'usb-Pinoccio_Pinoccio_95335343036351E07191-if00' },
  id: '/dev/ttyACM1|undefined|usb-Pinoccio_Pinoccio_95335343036351E07191-if00' }
{ event: 'unplug',
  device: 
   { comName: '/dev/ttyACM1',
     manufacturer: undefined,
     pnpId: 'usb-Pinoccio_Pinoccio_95335343036351E07191-if00' },
  id: '/dev/ttyACM1|undefined|usb-Pinoccio_Pinoccio_95335343036351E07191-if00' }

```




