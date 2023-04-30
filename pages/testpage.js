import Navbar from "@/components/Navbar";
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
export default function Testpage() {
    const data = useSpeechRecognition();
    const [clientData, setClientData] = useState(null);
    useEffect(() => {
        setClientData(data)
    }, [])
    return <main className="bg-base-200">
        <Navbar />
        <XMargins>
            <YMargins>
                <p>hasRecognitionSupport: {clientData && data.hasRecognitionSupport ? "Yes": "No"}</p>
                <p>Is Listening: {clientData && data.isListening ? "Yes" : "No"}</p>
                <button className="btn" onClick={clientData && data.startListening}>Start Listening</button>
                <button className="btn ml-2" onClick={clientData && data.stopListening}>Stop Listening</button>
                <p>Text: {clientData && data.text}</p>
            </YMargins>
        </XMargins>
    </main>
}