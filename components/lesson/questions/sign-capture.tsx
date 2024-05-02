import React, { useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

interface SignCaptureProps {
  onFrame: (data: (string | null | undefined)[]) => void;
}

const SignCapture = ({ onFrame }: SignCaptureProps) => {
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null);

  const captureFrame = useCallback(() => {
    if (webcamRef.current) {
      const data = webcamRef.current.getScreenshot();
      return data;
    }
  }, [webcamRef]);

  const captureFrames = useCallback(() => {
    let frames: (string | null | undefined)[] = [];

    for (let i = 0; i < 60; i++) {
      const data = captureFrame();
      frames.push(data);
    }
    const filteredFrames = frames.filter(
      (frame, index) => frame !== null && index % 2 == 0,
    );
    return filteredFrames;
  }, [captureFrame]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const frames = captureFrames();
      onFrame(frames);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {/* <Webcam
        ref={webcamRef}
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      ></Webcam> */}
    </div>
  );
};

export default SignCapture;
