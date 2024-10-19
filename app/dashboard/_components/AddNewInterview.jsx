"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "/components/ui/input";
import { Textarea } from "/components/ui/textarea"
import { chatSession } from "/utils/GeminiAIModel";



function AddNewInterview() {
    const [openDailog,setOpenDialog]= useState(false)
    const [jobPosition,setJobPosition]= useState();
    const [jobDesc,setJobDesc]= useState();
    const [jobExperience,setJobExperience]= useState();

    const onSubmit=async(e)=>{
        e.preventDefault()
        console.log(jobPosition,jobDesc,jobExperience);

        const InputPrompt= "Job Position: "+ jobPosition+", Job Description: "+ jobDesc +", Years of Experience: "+ jobExperience+ ", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question with Answered in Json Format, Give Question and Answered as field in JSON";


        const result = await chatSession.sendMessage(InputPrompt);


        console.log(result.response.text());
        
    }


  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      onClick={()=>setOpenDialog(true)}>
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more  about Job you are interviewing</DialogTitle>
            <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <h2>Add Details about your job position/role, job description and years of experiance</h2>
                <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required
                    onChange={(event)=>setJobPosition(event.target.value)}/>
                </div>
                <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea placeholder="Ex. React, NodeJs, MySql, Java" required
                    onChange={(event)=>setJobDesc(event.target.value)}/>
                </div>
                <div className="my-3">
                    <label>No of Year Experince</label>
                    <Input placeholder="Ex.5" type="number" max="50" required
                    onChange={(event)=>setJobExperience(event.target.value)}/>
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button type="submit">Start Interview</Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
