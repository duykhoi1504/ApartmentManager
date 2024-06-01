// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import {getFirestore,collection} from 'firebase/firestore'
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAa8EFYwSaNyJGW9n-9icSb_gpzpxgxf_k",
// //   authDomain: "apartmentapp-aff43.firebaseapp.com",
// //   projectId: "apartmentapp-aff43",
// //   storageBucket: "apartmentapp-aff43.appspot.com",
// //   messagingSenderId: "486205498209",
// //   appId: "1:486205498209:web:1b81b869c1dfaec2705b20",
// //   measurementId: "G-JQR6T8F8L7"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // export const auth= initializeApp(app,{
// //     persistence: getReactNativePersistence(AsyncStorage)
// // })

// // export const db=getFirestore(app)
// // export const useRef= collection(db,'user');
// // export const roomRef=collection(db,'rooms')
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useContext, useState } from "react";
// import { View } from "react-native";
// import { Button, Text, TextInput } from "react-native-paper";
// import { MyUserContext } from "./configs/Contexts";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAa8EFYwSaNyJGW9n-9icSb_gpzpxgxf_k",
//   authDomain: "apartmentapp-aff43.firebaseapp.com",
//   projectId: "apartmentapp-aff43",
//   storageBucket: "apartmentapp-aff43.appspot.com",
//   messagingSenderId: "486205498209",
//   appId: "1:486205498209:web:5031d8872b406136705b20",
//   measurementId: "G-60SGD61748"
// };

// const user= useContext(MyUserContext)
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // export const db=getFirestore(app)
// // export const useRef= collection(db,'user');
// // export const roomRef=collection(db,'rooms')

// const ChatApp = () => {
//   const addUserToFirestore = async (userData) => {
//     try {
//       // Add user data to 'users' collection
//       const docRef = await addDoc(collection(db, 'users'), userData);
//       console.log('Document written with ID: ', docRef.id);
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };



//   return (
//     <View>
//       <Text>CHAT</Text>
//       <Text>{user.username}</Text>

//       <TextInput type="text" value={null} onChange={()=>{}} />
//       <Button onPress={  addUserToFirestore(user)}>Send</Button>
//       </View>
//   );
// };

// export default ChatApp;

// firebase.js
import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {
  //catilen
  apiKey: "AIzaSyAa8EFYwSaNyJGW9n-9icSb_gpzpxgxf_k",
  authDomain: "apartmentapp-aff43.firebaseapp.com",
  projectId: "apartmentapp-aff43",
  storageBucket: "apartmentapp-aff43.appspot.com",
  messagingSenderId: "486205498209",
  appId: "1:486205498209:web:5031d8872b406136705b20",
  measurementId: "G-60SGD61748"
  //nha
  // apiKey: "AIzaSyBJHmv6SY1SI5KFGRoqeaB5GWnwoaQ7E78",
  // authDomain: "testt-7a7e5.firebaseapp.com",
  // projectId: "testt-7a7e5",
  // storageBucket: "testt-7a7e5.appspot.com",
  // messagingSenderId: "854469389273",
  // appId: "1:854469389273:web:9a41b5b0a05711d18687c8",
  // measurementId: "G-LL6XFWM2Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;