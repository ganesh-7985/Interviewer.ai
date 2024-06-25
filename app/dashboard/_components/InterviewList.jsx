'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq, desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewListCard from './InterviewListCard';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            getInterviewList();
        }
    }, [user]);

    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id));
        console.log(result);
        setInterviewList(result);
    };

    return (
        <div>
            <h2 className="font-medium text-white text-2xl">Previous Mock Interview List</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {interviewList.length > 0 ? (
                    interviewList.map((interview, index) => (
                        <InterviewListCard key={index} interview={interview}/>
                    ))
                ) : (
                    <p>No previous mock interviews found.</p>
                )}
            </div>
        </div>
    );
}

export default InterviewList;
