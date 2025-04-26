"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ExamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasWebcam(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasWebcam(false);
      }
    };

    initWebcam();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <main className="min-h-screen p-4">
      {/* Header with logo */}
      <header className="flex items-center justify-between mb-6">
        <div className="relative h-10 w-40">
          <Image
            src="/placeholder.svg?height=40&width=160"
            alt="Proctoring App Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-lg font-semibold">Exam in Progress</div>
      </header>

      {/* Main content area with 70/30 split */}
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)]">
        {/* Exam content - 70% width on desktop */}
        <div className="lg:w-[70%] bg-white rounded-lg shadow-md p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Exam</h1>

          <div className="space-y-8">
            <p>
              This is a sample exam. Developers can add their own questions and
              answers here.
            </p>
            <p>
              This is a sample exam. Developers can add their own questions and
              answers here.
            </p>
            <p>
              This is a sample exam. Developers can add their own questions and
              answers here.
            </p>
            <p>
              This is a sample exam. Developers can add their own questions and
              answers here.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
              Submit Exam
            </button>
          </div>
        </div>

        {/* Webcam view - 30% width on desktop */}
        <div className="lg:w-[30%]">
          <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
            {hasWebcam === false ? (
              <div className="flex items-center justify-center h-full text-white">
                <p>Webcam not available</p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* SVG Face Oval Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    viewBox="0 0 100 120"
                    className="w-[85%] h-[100%]"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M50,10 
                         C70,10 80,30 80,50 
                         C80,70 75,90 65,100 
                         C60,105 55,107 50,107 
                         C45,107 40,105 35,100 
                         C25,90 20,70 20,50 
                         C20,30 30,10 50,10 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">Proctoring Status</h3>
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
              <span>Monitoring active</span>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Keep your face visible within the oval at all times. Do not leave
              your seat during the exam.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
