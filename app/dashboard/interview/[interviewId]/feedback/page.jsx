'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'


function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        GetFeedback()
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)
        console.log(result);
        setFeedbackList(result);
    }

    return (
        <div className='flex flex-col items-center justify-center my-5'>
            <div className="p-10">
                <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
                <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
                <h2 className="text-primary text-lg my-3">Your overall performance</h2>
                <h2 className="text-sm text-gray-500">Find below interview feedback details.</h2>
            </div>
            <div className="text-sm text-gray-500">
                {feedbackList && feedbackList.map((item, index) => (
                    <Collapsible key={index} className='mt-5'>
                        <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                            {item.question} <ChevronsUpDown className="h-5 w-5" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className='flex flex-col gap-2'>
                                <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong> {item.rating}</h2>
                                <h2 className="p-2 border rounded-lg bg-red-100"><strong>Your Answer:</strong> {item.userAns}</h2>
                                <h2 className="p-2 border rounded-lg bg-green-100"><strong>Correct Answer:</strong> {item.correctAns}</h2>
                                <h2 className="p-2 border rounded-lg bg-blue-100"><strong>Feedback:</strong> {item.feedback}</h2>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
            <Link href="/dashboard">
                <Button>HOME</Button>
            </Link>
        </div>
    )
}

export default Feedback