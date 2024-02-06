import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const FireStore = {
  readDocs: (...args) => {
    const [collection_name] = args;
    let docs = [];
    const ref = collection(db, collection_name);
    return new Promise(async (resolve, reject) => {
      try {
        const snapshots = await getDocs(ref);
        snapshots.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (e) {
        reject(e);
        console.log(e);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args;
    return new Promise(async (resolve) => {
      const randomindex = Math.floor(Math.random() * 1000000000);
      try {
        const docRef = doc(db, collection_name, `${randomindex}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
          user: inputs.user,
        });
        resolve("New document successfully inserted");
      } catch (e) {
        console.log(e);
      }
    });
  },
};

export default FireStore;
