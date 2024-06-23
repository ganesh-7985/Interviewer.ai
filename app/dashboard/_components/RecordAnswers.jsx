"use client";
import { Button } from '@/components/ui/button';
import { MicIcon, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { chatSession } from '@/utils/Gemini_model';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';


function RecordAnswers({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

   useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
        updateUserAnsInDB()
    }
   },[userAnswer])
    const startStopRecording = async () => {
        if (isRecording) { 
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }

    const updateUserAnsInDB = async () => {
        setLoading(true)
        const feedbackPrompt = "Question:" + mockInterviewQuestions[activeQuestionIndex]?.question + ", user answer:" + userAnswer + "Depending on the Question and user answer for given interview question ,give rating for answer and feedback as area of improvement if any" +
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);
        const textResult = result.response.text();
        const feedbackResponse = textResult.replace('```json', '').replace('```', '');

        console.log(feedbackResponse);

        const respon = db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestions[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: feedbackResponse,
            rating: feedbackResponse?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
        })

        if (respon) {
            toast('User Answer Recorded Successfully')
            setResults([]);
        }
        setResults([]);
        setLoading(false)

    }
    return (
        <div className=" flex flex-col items-center">
            <div className=" flex flex-col my-5 w-full rounded-lg p-5">
                {webCamEnabled ? (
                    <Webcam className="rounded-lg bg-slate-500"
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: '100%',
                            zIndex: 10
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className="h-72 w-full  pt-5 bg-secondary rounded-lg border" />
                        <Button onClick={() => setWebCamEnabled(true)} className=" my-4">Enable web camera</Button>
                    </>
                )}
                <Button onClick={() => setWebCamEnabled(false)} className={`${webCamEnabled ? "" : "hidden"} my-4`}>
                    Disable web camera
                </Button>
            </div>
            <div>
                <Button disabled={loading} onClick={startStopRecording} variant="outline"> <MicIcon></MicIcon>
                    {isRecording ? <h2 className='text-red-500 animate-pulse flex gap-2 items-center'> Stop Recording..</h2> : <h2 className=' text-primary flex gap-2 items-center'> Record Answer</h2>}
                </Button>
            </div>
        </div>
    )
}

export default RecordAnswers