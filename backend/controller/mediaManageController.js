import firebaseApp from '../firebaseConfig.js';
import { getFirestore, addDoc,doc,getDocs,getDoc,updateDoc,deleteDoc,collection, Timestamp } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const coll = collection(db,'media-manage')

// get up comings
export const getSliders = async (req, res) => {
    try {
        const querySnapshot = await getDocs(coll);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json('internal server error')
    }
}

// get up comings
export const getUpComings = async (req, res) => {
    try {
        const querySnapshot = await getDocs(coll);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const movies = data.filter(movie=>movie.section==='up coming')

        res.status(200).json(movies);
    } catch (error) {
        console.log(error)
        res.status(500).json('internal server error')
    }
}