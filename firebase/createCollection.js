import firebase from "@/firebase/firebaseClient"

export default async function createCollection(authorName, collectionName, about, uid) {
    const genRand = (len) => {
        return Math.random().toString(36).substring(2,len+2);
    }
    const docName = genRand(10)
    await firebase.firestore().collection("collections").doc(docName).set({
        cards: [],
        author: authorName,
        about: about,
        name: collectionName
    })
    await firebase.firestore().collection("users").doc(uid).update({
        collections: firebase.firestore.FieldValue.arrayUnion(docName)
    });
    return docName
}