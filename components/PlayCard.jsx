import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { useState, useEffect } from "react";

export default function PlayCard({flip, listen, getResponse, isAnswer, showQuestion, question, answer, allDisabled}) {
    const data = useSpeechRecognition(getResponse);
    const [clientData, setClientData] = useState(null);
    useEffect(() => {
        setClientData(data)
    }, [])
    return <div className="card w-96 h-80 bg-base-100 shadow-xl ">
        <p className="w-full text-center text-gray-500 pt-5">{isAnswer ? "Answer" : "Question"}</p>
        <div className="card-body flex flex-col justify-between">
            <h2 className="card-title">{showQuestion ? question : answer}</h2>
            {
                clientData && data.hasRecognitionSupport ?
                <div className="card-actions justify-center">
                    <button className="btn btn-square btn-circle btn-accent" onClick={listen} disabled={allDisabled}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                    <button className="btn btn-primary" onClick={flip} disabled={allDisabled}>Flip card</button>
                    {
                        clientData && data.isListening ?
                        <button className="btn btn-error bg-red-500 btn-square btn-circle border-red-500" onClick={clientData && data.stopListening} disabled={allDisabled}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic-off"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                        :
                        <button className="btn btn-secondary btn-square btn-circle" disabled={!clientData || allDisabled} onClick={clientData && data.startListening}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    }
                </div>
                :
                <p>Your browser does not support voice recognition</p>
            }
        </div>
    </div>
}