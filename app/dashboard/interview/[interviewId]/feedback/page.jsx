"use client"
import React, { useEffect, useState } from 'react'
import { db } from '/utils/db'
import { eq } from 'drizzle-orm'
import { UserAnswer } from '/utils/schema'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "/components/ui/collapsible"



function Feedback({params}) {

const [feedbackList,setFeedbackList] =useState([]);

useEffect(()=>{
  GetFeedback();
},[])

const GetFeedback=async()=>{
  const result=await db.select()
  .from(UserAnswer)
  .where(eq(UserAnswer.mockIdRef,params.interviewId))
  .orderBy(UserAnswer.id);

  console.log(result);
  setFeedbackList(result);
}

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gery-500'>Find below interview questions with correct answer, and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index}>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      
      ))}
    </div>
  )
}

export default Feedback