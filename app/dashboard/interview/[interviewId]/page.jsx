'use client';

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState('');
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewId]);

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);
        console.log(interviewData);
    };

    return (
        <div className="my-10 flex  flex-col">
            <h1 className="font-bold text-2xl text-white">Let's Get Started....</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border bg-slate-800 text-white">
                        <h2 className="text-lg"><strong>Job Position: </strong>{interviewData.jobPosition}</h2>
                        <h2 className="text-lg"><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
                        <h2 className="text-lg"><strong>Experience: </strong>{interviewData.jobExperience}</h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
                        <h2><Lightbulb /> <strong>Information</strong> </h2>
                        <h2>Enable Webcam and microphone to start Interview with AI.It has five Questions which you need to answer it.You will get Report after the Interview.NOTE : You can disable the webcam and audio at any time</h2>
                    </div>
                </div>
                <div className=" w-96 justify-center pt-5 items-center">
                    {webCamEnabled ? (
                        <Webcam className="rounded-lg bg-slate-500"
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            audio={true}
                            style={{
                                height: 288,
                                width: 500,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full  pt-5 bg-slate-800 text-white rounded-lg border" />
                            <Button onClick={() => setWebCamEnabled(true)} className="w-full my-4">Enable web camera and audio</Button>
                        </>
                    )}
                    <Button onClick={() => setWebCamEnabled(false)} className={`${webCamEnabled ? "" : "hidden"} w-full my-4`}>
                        Disable web camera and audio
                    </Button>
                </div>
            </div>
            <div className="p-5 mb-5 border rounded-lg bg-gray-100">
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p>Welcome to the mock interview process! Here’s what you can expect:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>We will ask you five questions related to the job position you are applying for.</li>
                    <li>You need to answer each question verbally while the webcam and microphone are enabled.</li>
                    <li>After completing the interview, you will receive a report with feedback on your performance.</li>
                    <li>You can disable the webcam and audio at any time during the interview.</li>
                </ul>
            </div>
            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
