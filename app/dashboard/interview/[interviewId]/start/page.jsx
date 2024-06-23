'use client';
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Questionsection from "../../../_components/Questionsection";
import RecordAnswers from "@/app/dashboard/_components/RecordAnswers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewId]);

    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            if (result.length > 0) {
                const jsonMockResp = result[0].jsonMockResp;
                console.log('Raw JSON response:', jsonMockResp);

                // Validate and parse JSON
                if (jsonMockResp && typeof jsonMockResp === 'string') {
                    try {
                        const parsedJson = JSON.parse(jsonMockResp);
                        console.log('Parsed JSON response:', parsedJson);
                        setMockInterviewQuestion(parsedJson);
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                    }
                } else {
                    console.error('Invalid JSON response');
                }

                setInterviewData(result[0]);
            } else {
                console.error('No interview details found');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Questionsection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} />
                <RecordAnswers mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} />
            </div>
            <div className="flex justify-end gap-6 my-5">
                {activeQuestionIndex > 0 &&
                 <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>prev Question</Button>}
                {activeQuestionIndex != mockInterviewQuestions?.length - 1 && 
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                {activeQuestionIndex == mockInterviewQuestions?.length - 1 && 
                <Link href={`/dashboard/interview/${params.interviewId}/feedback`}>
                <Button>End Interview</Button>
                </Link>}
            </div>
        </div>
    )
}

export default StartInterview;
