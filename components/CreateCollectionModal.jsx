import createCollection from "@/firebase/createCollection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import firebase from "@/firebase/firebaseClient"

export default function CreateCollectionModal() {
    const [collectionName, setCollectionName] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [user, setUser] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // uid, displayName, email, emailVerified, photoURL
                setUser(user)
            } else {
                console.log("You are signed out")
            }
        });
    }, [])
    async function create() {
        if (collectionName.length < 2) return alert("Your collection name needs to be at least 2 characters long");
        if (collectionName.length > 50) return alert("Your collection name cant be longer than 50 characters long");
        if (about.length > 500) return alert("Your collection name cant be longer than 500 characters long");
        setLoading(true)
        const docName = await createCollection(user.displayName, collectionName, about, user.uid)
        router.push("/editflashcard/" + docName)
    }
    return <div className="modal" id="create-collection-modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Create a flashcard collection</h3>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Collection Name*</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                value={collectionName} onChange={e => setCollectionName(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">About this collection <span className="text-gray-500">(optional)</span></span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
                value={about} onChange={e => setAbout(e.target.value)}
                ></textarea>
            </div>
            <br />
            <span className="text-gray-500">PS: This collection will be public for anyone to see</span>
            <div className="modal-action">
                <a href="#" className="btn">Cancel</a>
                {
                    loading ?
                    <button className="btn btn-accent loading">Loading</button>
                    :
                    <button className="btn btn-accent" onClick={create}>Create Collection</button>
                }
            </div>
        </div>
    </div>
}