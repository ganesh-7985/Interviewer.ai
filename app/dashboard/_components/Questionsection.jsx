import { Lightbulb } from 'lucide-react';
import React from 'react';

function Questionsection({ mockInterviewQuestions, activeQuestionIndex }) {
    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                {
                    mockInterviewQuestions && mockInterviewQuestions.map((question, index) => (
                        <h2 key={index} className={`p-2 bg-slate-400 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index &&'bg-primary font-bold'}`}>
                            Question-{index + 1}
                        </h2>
                    ))
                }
            </div>
            <h2 className='my-5 text-sm text-white md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
            <div className="p-5 border rounded-lg bg-blue-100 mt-20">
                        <h2 className='flex gap-2 items-center text-primary'><Lightbulb/> <strong>NOTE:</strong> </h2>
                        <h2 className='text-sm text-primary my-2'>Press on Record Answer to Answer the Question.At the end of the interview you get the feedback along the Correct answers and you can compare with it..</h2>
                    </div>
        </div>
        
    );
}

export default Questionsection;