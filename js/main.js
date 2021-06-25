loadScript("https://code.getmdl.io/1.3.0/material.min.js");

function openModel(localPath) {
  openPage("viewer.html?path=" + localPath);
}

function openPage(href) {
  window.location.href = href;
}

function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  document.head.appendChild(script);
}
