logMediaDevices();

this.addEventListener("arjs-video-loaded", () => {
  var videoAr = document.getElementById("arjs-video");
  var main = document.getElementsByClassName("content")[0];
  main.appendChild(videoAr);
});
