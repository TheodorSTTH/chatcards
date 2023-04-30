import firebase from "@/firebase/firebaseClient"

export default async function getCollections(uid) {
    let out = null;
    await firebase.firestore().collection("users").doc(uid).get().then((doc) => {
        if (doc.exists) {
            out = doc.data().collections;
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    return out
}