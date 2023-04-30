import { useState, useEffect } from "react";
import CollectionPreview from "./CollectionPreview";
import firebase from "@/firebase/firebaseClient"
import getCollections from "@/firebase/getCollections";
import H3 from "./H3";

export default function Collections() {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // uid, displayName, email, emailVerified, photoURL
                (async () => {
                    const cols = await getCollections(user.uid)
                    setCollections(cols)
                })()
            } else {
                console.log("You are signed out")
            }
        });
    }, [])
    return <div className="flex flex-wrap gap-8">
        {
            collections && collections.length ? 
            [...collections].reverse().map((id, i) => <CollectionPreview collectionId={id} key={i}/>)
            :
            <div >
                <H3>It seems like you dont have any collections yet</H3>
                <p>Go create one </p>
                <img  src="void.png" className="w-96"/>
            </div>
        }
    </div>
}