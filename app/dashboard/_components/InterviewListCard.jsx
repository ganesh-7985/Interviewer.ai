import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewListCard({interview, index}) {
    const router = useRouter(); 

    const onstart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    }

    const onFeedback = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
    }

    return (
        <div key={index} className=" bg-slate-800 p-4 border shadow-lg rounded-lg my-2 transform transition-transform duration-200 hover:scale-105">
            <h2 className="font-bold text-primary-light">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-white">{interview?.jobExperience} years of experiences</h2>
            <p className="text-sm text-gray-500">Created At: {new Date(interview.createdAt).toLocaleDateString()}</p>
            <div className='flex justify-between mt-2 gap-5'>
                <Button onClick={onFeedback} size='sm' variant="outline" className="w-full text-white">feedback</Button>
                <Button onClick={onstart} size='sm' className='w-full'>start</Button>
            </div>
        </div>
    )
}

export default InterviewListCard
