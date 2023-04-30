import Link from "next/link";
import { useEffect, useState } from "react";
import firebase from "@/firebase/firebaseClient"

export default function CollectionPreview({collectionId}) {
    const [name, setName] = useState("Loading...")
    const [about, setAbout] = useState("Loading...")
    const [cards, setCards] = useState("Loading")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            await firebase.firestore().collection("collections").doc(collectionId).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setName(data.name)
                    setAbout(data.about)
                    let cardLength = 0
                    data.cards.forEach(card => {
                        if (!card.removed) cardLength++;
                    }) 
                    setCards(cardLength)
                    setLoading(false)
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        })()
    }, [])
    return <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{about}</p>
            <p>{cards} card{cards !== 1 && "s"}</p>
            <div className="card-actions justify-end flex gap-4">
                <a href={"https://twitter.com/intent/tweet?url=https://chatcards.vercel.app/playcollection/" + collectionId}>
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    </button>
                </a>
                <Link href={"/editflashcard/" + collectionId}>
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                </Link>
                {
                    loading ? 
                    <button className="btn btn-secondary" disabled>Play</button>
                    :
                    <Link href={`/playcollection/${collectionId}`}>
                        <button className="btn btn-secondary">Play</button>
                    </Link>
                }
            </div>
        </div>
    </div>
}