import React, { useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

interface SignCaptureProps {
  onFrame: (data: (string | null | undefined)[]) => void;
}

const SignCapture: React.FC<SignCaptureProps> = ({ onFrame }) => {
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

  const videoConstraints: MediaTrackConstraints = {
    facingMode: "user",
    width: 1280,
    height: 720,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const frames = captureFrames();
      onFrame(frames);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [captureFrames, onFrame]);

  return (
    <div className="aspect-[5/4] overflow-hidden rounded-xl sm:aspect-video">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="h-full w-full -scale-x-100 object-cover"
      ></Webcam>
    </div>
  );
};

export default SignCapture;
