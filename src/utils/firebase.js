import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc , setDoc, collection, addDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCtRr0_ksnBdShTqQOd2xHgR_wD6Cq45WA",
    authDomain: "deakin-web-app-cba3b.firebaseapp.com",
    projectId: "deakin-web-app-cba3b",
    storageBucket: "deakin-web-app-cba3b.appspot.com",
    messagingSenderId: "812789337611",
    appId: "1:812789337611:web:49e3533d07a2b25f49010e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider(); 
   provider.setCustomParameters ({
    prompt:"select_account"
   });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const storageRef = getStorage();


export const uploadImageToStorage = async (imageFile) => {
  try {
    const storageRef = ref(getStorage(), 'images/' + imageFile.name);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const saveJobPostingToFirestore = async (jobData) => {
  try {
    const jobsCollection = collection(db, 'jobs');
    await addDoc(jobsCollection, jobData);
  } catch (error) {
    console.error('Error saving job posting:', error);
  }
};

export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
  if (!userAuth) return;
  

  const userDocRef = doc (db, 'users', userAuth.uid );
 
  
  const userSnapshot = await getDoc(userDocRef);
 

  if (! userSnapshot.exists()){
    const { firstname, lastname , email } = userAuth;
    const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      firstname,
      lastname,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  catch (error){
  console.log('error in creating ', error.message)
  }
}

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password)
}

export const signinAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password)
}