"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner"
import { chatSession } from "/utils/GeminiAIModel";



function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer((prevAns) =>
        prevAns + results.map((result) => result.transcript).join(' ')
      );
    }
  }, [results]);
  

  const SaveUserAnswer = async()=>{
    if(isRecording){
      stopSpeechToText()
      if(userAnswer?.length<10){
        toast('Error while saving your Answer, Please record again')
        return;
      }

      const feedbackPrompt = "Questions"+mockInterviewQuestion[activeQuestionIndex]?.Question +
      ", User Answer:"+userAnswer+",Depends on question and user answer for given interview question" +
      " please give us rating for answer and feedback as area of improvement if any" + 
      "in just 3 to 5 Lines to improve it in JSON format with rating field and feedback and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      console.log(mockJsonResp);
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
    }
    else{
      startSpeechToText();
    }
  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex  flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="my-10 "
        onClick={SaveUserAnswer}>
        {isRecording ? 
          <h2 className="text-red-600 flex gap-2">
            <StopCircle />stop Recording
          </h2>
         : 
          <h2 className="text-primary flex gap-2 items-center"><Mic/>Record Answer</h2>
        }
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
