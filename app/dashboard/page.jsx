import InterviewList from './_components/InterviewList'
import NewInterview from './_components/NewInterview'

function dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-5xl text-white'>Dashboard</h2>
      <h2 className='text-white '>Create and start Your Mock Interview with the help of AI</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <NewInterview/>
      </div>
      <div>
        <InterviewList/>
      </div>
    </div>
  )
}

export default dashboard