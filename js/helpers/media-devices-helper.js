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

function getUserMediaDeprecated() {
  return (navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
}

function hasUserMediaDeprecated() {
  return !!getUserMediaDeprecated();
}

function getMediaStreamDeprecated() {
  if (hasUserMediaDeprecated()) {
    navigator.getUserMedia = getUserMediaDeprecated();

    navigator.getUserMedia(
      { video: true, audio: true },
      function (stream) {
        return stream;
      },
      function (err) {
        alert(err.name + ": " + err.message);
      }
    );
  } else {
    alert("User doesn't have any media device");
  }
}

/* function getMediaStream(constraints) {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      return stream;
    })
    .catch(function (err) {
      alert(err.name + ": " + err.message);
    });
} */
