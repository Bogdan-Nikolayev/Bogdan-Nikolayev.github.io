// https://github.com/philnash/mediadevices-camera-selection/blob/master/app.js
// https://www.twilio.com/blog/choosing-cameras-javascript-mediadevices-api-html
// https://github.com/AR-js-org/AR.js/issues/26#issuecomment-859265770

/* <div class="controls">
  <select id="videoinput-select"></select>
  <button id="apply-videoinput-button">Apply</button>
</div> */

const applyVideoinputButton = document.getElementById(
  "apply-videoinput-button"
);
const videoinputSelect = document.getElementById("videoinput-select");
let video = getVideoElement();
let currentStream;

navigator.mediaDevices.enumerateDevices().then(fillVideoinputSelect);

applyVideoinputButton.addEventListener("click", (event) => {
  if (typeof currentStream !== "undefined") {
    stopMediaTracks(currentStream);
  }

  const constraints = {
    video: { deviceId: videoinputSelect.value },
    audio: false,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      currentStream = stream;
      video = video || getVideoElement();
      video.srcObject = stream;

      return navigator.mediaDevices.enumerateDevices();
    })
    .then(fillVideoinputSelect)
    .catch((error) => {
      console.error(error);
    });
});

function fillVideoinputSelect(mediaDevices) {
  videoinputSelect.innerHTML = "";

  let count = 1;
  mediaDevices.forEach((mediaDevice) => {
    if (mediaDevice.kind === "videoinput") {
      const option = document.createElement("option");
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.value = mediaDevice.deviceId;
      option.appendChild(textNode);

      videoinputSelect.appendChild(option);
    }
  });
}

function stopMediaTracks(stream) {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}

function getVideoElement() {
  return document.getElementsByTagName("video")[0];
}
