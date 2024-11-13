import React from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2  rounded-full 
                text-xs md:text-sm text-center cursor-pointer
                ${activeQuestionIndex===index ?
                'bg-primary text-white' : 'bg-secondary text-black'}`}>
                  Question #{index+1}</h2>
                  
            ))}
        </div>
        <h2>{mockInterviewQuestion[activeQuestionIndex]?.Question}</h2>

    </div>
  )
}

export default QuestionsSection