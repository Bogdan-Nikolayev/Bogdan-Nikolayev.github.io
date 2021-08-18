const aCamera = document.getElementsByTagName("a-camera")[0];

logMediaDevices();

this.addEventListener("arjs-video-loaded", () => {
  var videoAr = document.getElementById("arjs-video");
  var main = document.getElementsByClassName("content")[0];
  main.appendChild(videoAr);
});

document
  .getElementById("latitude-input")
  .addEventListener("input", function (e) {
    const gpsCamera = aCamera.getAttribute("gps-camera");
    gpsCamera.simulateLatitude = e.target.value;
    aCamera.setAttribute("gps-camera", gpsCamera);
  });

document
  .getElementById("longitude-input")
  .addEventListener("input", function (e) {
    const gpsCamera = aCamera.getAttribute("gps-camera");
    gpsCamera.simulateLongitude = e.target.value;
    aCamera.setAttribute("gps-camera", gpsCamera);
  });

document
  .getElementById("rotation-input")
  .addEventListener("input", function (e) {
    aCamera.parentElement.object3D.rotation.set(
      0,
      THREE.Math.degToRad(e.target.value),
      0
    );
  });
