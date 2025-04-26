"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WarningBox } from "@/components/warning-box";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasWebcam(true);
          setWarning(null);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasWebcam(false);
        setWarning(
          "No webcam detected or permission denied. Please ensure your webcam is connected and you've granted permission."
        );
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
    <main className="flex min-h-screen flex-col items-center p-6">
      {/* Logo at the top */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative h-12 w-48">
          <Image
            src="/placeholder.svg?height=48&width=192"
            alt="Proctoring App Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Webcam Verification
        </h1>

        {warning && <WarningBox message={warning} />}

        <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video mb-6">
          {hasWebcam === false ? (
            <div className="absolute inset-0 flex items-center justify-center text-white">
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  viewBox="0 0 100 120"
                  className="w-[85%] h-[85%]"
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
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                Position your face within the oval
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
            onClick={() => {
              if (hasWebcam) {
                router.push("/exam");
              } else {
                setWarning("Webcam access is required to proceed to the exam.");
              }
            }}
          >
            Continue to Exam
          </button>
        </div>
      </div>
    </main>
  );
}
