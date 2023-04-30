import H2 from "@/components/H2";
import firebase from "@/firebase/firebaseClient"
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";
import { useState } from "react";
import { useRouter } from 'next/router'
import Navbar from "@/components/Navbar";


export default function signin() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    async function signinGoogle() {
        try {
            setLoading(true);
            const userCredentials = await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider);
            console.log({...userCredentials});
            console.log({...userCredentials.user});
            firebase.firestore().collection("users").doc(userCredentials.user.uid).get().then(async (doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                }
                else {
                    await firebase.firestore().collection("users").doc(userCredentials.user.uid).set({ 
                        collections: [],
                        uid: userCredentials.user.uid,
                        email: userCredentials.user.email,
                        name: userCredentials.user.displayName,
                        provider: userCredentials.user.providerData[0].providerId,
                        photoUrl: userCredentials.user.photoURL
                    })
                }
            })

            router.replace("/dashboard")
        }
        catch (err) {
            console.log(err)
            alert("ERROR: ", JSON.stringify(err))
            setLoading(false)
        }
    }
    return <main className="bg-base-200 h-screen">
        <Navbar />
        <XMargins className=" h-full">
            <YMargins className="flex items-center justify-center  h-full">
                <div className="shadow-lg bg-base-100 p-8 w-96 h-96 flex flex-col justify-start items-center gap-8">
                    <div className="flex flex-col items-center">
                        <H2>Sign Up</H2>
                        <p className="text-center py-8">to use ChatCards and start learning with audio flashcards</p>
                    </div>
                    {loading ?
                    <button className="btn btn-square btn-outline loading"></button>
                    :
                    <button className="btn btn-outline" onClick={signinGoogle}>
                        <img className="h-6 pr-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png?20230305195327" />
                        Continue with Google
                    </button>}
                </div>
            </YMargins>
        </XMargins>
    </main>
}