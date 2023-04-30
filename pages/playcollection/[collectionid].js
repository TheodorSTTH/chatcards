import H1 from "@/components/H1";
import H2 from "@/components/H2";
import Navbar from "@/components/Navbar";
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import firebase from "@/firebase/firebaseClient"
import Card from "@/components/Card";
import H3 from "@/components/H3";
import PlayCard from "@/components/PlayCard";

export default function PlayCollection() {
    const router = useRouter();
    const { collectionid } = router.query;
    const [collectionData, setCollectionData] = useState();
    const [currentCard, setCurrentCard] = useState(0)
    const [showQuestion, setShowQuestion] = useState(true)
    const [allDisabled, setAllDisabled] = useState(false)
    useEffect(() => {
        if (collectionid) {
            firebase.firestore().collection("collections").doc(collectionid).get().then((doc) => {
                if (doc.exists) {
                    setCollectionData(doc.data())
                    console.log("Document data:", doc.data());
                    localStorage.setItem('chatcardsCurrentCards', JSON.stringify(doc.data().cards));
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [collectionid])
    function flip() {
        setShowQuestion(prev => !prev)
    }
    const speak = (prompt) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(prompt);
            utterance.lang = 'en-IN'; // IN
            utterance.rate = 0.8;
            utterance.pitch = 1.3;
            speechSynthesis.speak(utterance);
        } else {
            alert('Your browser does not support the Web Speech API');
        }
    };
    function listen() {
        // alert("This function is not available yet")
        speak(collectionData.cards[currentCard][showQuestion ? "question" : "answer"])
    }
    function next() {
        if (!collectionData || currentCard + 1 === collectionData.cards.length) return;
        let skip = 1;
        const cardsAhead = [...collectionData.cards].slice(currentCard + 1, collectionData.cards.length)
        cardsAhead.forEach(card => {
            if (card.removed) skip++;
        })
        // console.log(cardsAhead)
        setCurrentCard(prev => prev + skip)
        setShowQuestion(true)
    }
    function previous() {
        if (!currentCard || !collectionData) return;
        const cardsBefore = [...collectionData.cards].slice(0, currentCard)
        let highestIndex = 0;
        cardsBefore.forEach((card, i) => {
            if (!card.removed) highestIndex = i;
            // console.log(i, card.removed)
        })
        // console.log(cardsBefore)
        // console.log(highestIndex)
        setCurrentCard(highestIndex)
        setShowQuestion(true)
    }
    useEffect(() => localStorage.setItem('chatcardsCurrentCard', currentCard), [currentCard])
    async function getResponse(text) {
        setAllDisabled(true)
        // const currentCards = JSON.parse(localStorage.getItem('chatcardsCurrentCards'));
        // alert("YOOO")
        const cc = localStorage.getItem('chatcardsCurrentCard')
        console.log(cc)
        const card = JSON.parse(localStorage.getItem('chatcardsCurrentCards'))[cc];
        // alert(text, card.question, card.answer)
        console.log("Question: " + card.question)
        console.log("Answer: " + card.answer)
        console.log(card)
        const raw = await fetch("/api/checkAnswer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "question": card.question,
                "answer": card.answer,
                "userAnswer": text
            })
        })
        const response = await raw.json()
        const responseString = response.data.choices[0].message.content
        console.log(responseString)
        // alert(responseString)
        speak(responseString)
        setAllDisabled(false)
    }
    return <main className='bg-base-200'>
        <Navbar />
        <XMargins>
            <div className="p-12">
                <div className="flex flex-col items-center w-full gap-8">
                    <div className="flex flex-col gap-4">
                        <H2>{collectionData ? collectionData.name : "Loading..."}</H2>
                        <H3>Made by {collectionData ? collectionData.author : "Loading..."}</H3>
                    </div>
                    <PlayCard 
                    showQuestion={showQuestion}
                    answer={collectionData && collectionData.cards[currentCard]["answer"]}
                    question={collectionData && collectionData.cards[currentCard]["question"]}
                    flip={flip} 
                    listen={listen}
                    isAnswer={!showQuestion}
                    getResponse={getResponse}
                    allDisabled={allDisabled}
                    />
                    <div className="flex gap-4">
                        <button className="btn btn-circle" onClick={previous}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>
                        <button className="btn btn-circle" onClick={next}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>
        </XMargins>
    </main>
}