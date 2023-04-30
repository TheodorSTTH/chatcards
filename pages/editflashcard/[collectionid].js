import H1 from "@/components/H1";
import Navbar from "@/components/Navbar";
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import firebase from "@/firebase/firebaseClient"
import Card from "@/components/Card";
import H3 from "@/components/H3";

export default function EditCollection() {
    const [collectionName, setCollectionName] = useState("Loading...")
    const [about, setAbout] = useState("Loading...")
    const [collectionData, setCollectionData] = useState(null)
    const [cards, setCards] = useState(null)
    const [firstFetch, setFirstFetch] = useState(true)
    const router = useRouter();
    const { collectionid } = router.query;

    useEffect(() => {
        if (collectionid) {
            firebase.firestore().collection("collections").doc(collectionid)
            .onSnapshot((doc) => {
                setCollectionData(doc.data());
                if (firstFetch) {
                    setFirstFetch(false)
                    setCollectionName(doc.data().name);
                    setAbout(doc.data().about);
                    setCards(doc.data().cards)
                }
            });
        }
    }, [collectionid])
    async function createCard() {
        setCards(prev => [...prev, {question: "", answer: ""}])
    }
    async function save() {
        if (collectionName.length < 2) return alert("Your collection name needs to be at least 2 characters long");
        if (collectionName.length > 50) return alert("Your collection name cant be longer than 50 characters long");
        if (about.length > 500) return alert("Your collection name cant be longer than 500 characters long");
        await firebase.firestore().collection("collections").doc(collectionid).update({
            name: collectionName,
            about: about,
            cards: cards
        })
        alert("Successfully saved")
    }
    return <main className='bg-base-200'>
        <button className="btn btn-success shadow-xl btn-circle btn-lg fixed bottom-8 right-4" onClick={save}>Save</button>
        <Navbar />
        <XMargins>
            <YMargins>
                <H1>Edit collection</H1>
                <p className="text-gray-500 pt-4">Author: {collectionData ? collectionData.author : "loading..."}</p>
                <br />
                {/* <p>{collectionData ? JSON.stringify(collectionData) : "loading..."}</p> */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What is the collection name?</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                    value={collectionName} onChange={e => setCollectionName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">About</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Tell us about this card collection"
                    value={about} onChange={e => setAbout(e.target.value)}></textarea>
                </div>
                <div className="divider"></div> 
                <div className="w-full flex flex-col gap-4">
                    {
                        cards ? 
                            cards.length ?
                            <div className="w-full flex flex-col items-center gap-4">
                                {cards.map((card, i) => card.removed ? null : <Card index={i} cards={cards} setCards={setCards} key={i}/>) }
                                <button onClick={createCard} className="btn btn-primary mt-4">Add Card</button>
                            </div>
                            :
                            <div className="flex flex-col items-center">
                                <H3>Theres no cards in this collection yet</H3>
                                <br/>
                                <button onClick={createCard} className="btn btn-primary">Add Card</button>
                            </div>
                        : 
                        "Loading..."
                    }
                    {/* <Card />
                    <Card /> */}
                </div>
            </YMargins>
        </XMargins>
    </main>
}