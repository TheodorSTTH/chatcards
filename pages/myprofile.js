import H2 from "@/components/H2";
import H3 from "@/components/H3";
import Navbar from "@/components/Navbar";
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";
import firebase from "@/firebase/firebaseClient"
import { useEffect, useState } from "react";

export default function myprofile() {
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
    return <main className='bg-base-200 min-h-screen'>
        <Navbar />
        <XMargins>
            <YMargins>
                {
                    user ? 
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-8">
                            <div className="avatar">
                                <div className="w-24">
                                    <img src={user.photoURL} className="rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <H3>{user.displayName}</H3>
                                <p>Email: {user.email}</p>
                                <p>Verified Email: {user.emailVerified ? "Yes" : "No"}</p>
                            </div>
                        </div>
                        <p>Want to delete your data? <a className="link link-primary" href="mailto:spamstuff.tst@gmail.com">Send us an email</a>.</p>
                    </div>
                    :
                    <div>
                        <H2>You are signed out</H2>
                        <p>Sign in <a className="link" href="/signin">here</a> or sign up <a className="link" href="/signup">here</a></p>
                    </div>
                }
            </YMargins>
        </XMargins>
    </main>
}