// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices

function logMediaDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    return;
  }

  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {
        console.log(
          device.kind + ": " + device.label + " id = " + device.deviceId
        );
      });
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}
