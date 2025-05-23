import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState("");

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(() => alert("Error accessing camera"));
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const image = canvas.toDataURL("image/png");
    setImageData(image);
    onCapture(image);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }}></video>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture</button>
      {imageData && <img src={imageData} alt="Captured" />}
    </div>
  );
};

export default CameraCapture;
