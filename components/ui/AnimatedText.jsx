"use client";
import Link from "next/link";
import { TypewriterEffect } from "../ui/typewriter-effect";

 function AnimatedText() {
  const words = [
    {
      text: "Prepare",
    },
    {
      text: "for",
    },
    {
      text: "your",
    },
    {
      text: "interview",
    },
    {
      text: "with",
    },
    {
      text: "Interviewer.ai",
      className: "text-primary dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-200 dark:text-neutral-200 text-base  mb-10">
        The road to Interview starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link href={'/sign-in'}><button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          SignIn
        </button></Link>
        <Link href={'/dashboard'}><button className="w-40 h-10 rounded-xl bg-primary-light text-white border border-black  text-sm">
          Get Started 
        </button></Link>
      </div>
    </div>
  );
}


export default AnimatedText;