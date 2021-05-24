loadScript("https://code.getmdl.io/1.3.0/material.min.js");

function openModel(localPath) {
  window.location.href = "viewer.html?path=" + localPath;
}

function openPage(href) {
  window.location.href = href;
}

function loadScript(url) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  head.appendChild(script);
}
