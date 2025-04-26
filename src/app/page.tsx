import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Home() {
  // Sample rules - replace with your actual rules
  const rules = [
    "Ensure your webcam is on and your face is clearly visible throughout the exam.",
    "No additional devices or screens are allowed during the examination.",
    "Your testing environment should be quiet and free from distractions.",
    "No other person is allowed to enter the room during your examination.",
    "You must remain seated for the duration of the exam.",
    "No headphones or earbuds are permitted unless specifically authorized.",
    "Your desk must be clear of all materials except those permitted for the exam.",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      {/* TODO: this will go to the header component along with user button */}
      <div className="w-full flex justify-center mb-12 mt-8">
        <div className="relative h-16 w-64">
          <Image
            src="/placeholder.svg?height=64&width=256"
            alt="Proctoring App Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Rules section */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Examination Rules
        </h1>

        <ScrollArea className="h-[320px] rounded-md border p-4">
          <ul className="space-y-4">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <p>{rule}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Button*/}
      <Link href="/verification">
        <Button
          size="lg"
          className="px-8 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Start Proctored Exam
        </Button>
      </Link>
    </main>
  );
}
