// let stream = getMediaStream({ audio: true, video: true });
// let peerConnection = new RTCPeerConnection();
// let rtpSender = peerConnection.addTrack(stream.getTracks()[0]);

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(function (stream) {
    let peerConnection = new RTCPeerConnection();
    peerConnection.addTrack(stream.getVideoTracks()[0]);
    peerConnection.createOffer().then(
      function (offer) {
        return peerConnection.setLocalDescription(offer);
      },
      function (err) {
        alert(err.name + ": " + err.message);
      }
    );
  })
  .catch(function (err) {
    alert(err.name + ": " + err.message);
  });
