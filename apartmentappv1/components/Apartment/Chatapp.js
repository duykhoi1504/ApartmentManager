import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import MyStyles from "../../styles/MyStyles";
import { useRoute } from "@react-navigation/native";
import { MyUserContext, MyDispatchContext } from "../../configs/Contexts";
import firestore from '@react-native-firebase/firestore';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import app from '../../firebaseConfig';

const ChatApp = () => {
  const userId = useContext(MyUserContext);
  const [messagesList, setMessagesList] = useState([]);
  const route = useRoute();
  const db = getFirestore(app);

  useEffect(() => {
    const chatId = `${userId.id}${route.params.user.id}`;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessagesList(allMessages);
    });

    return () => unsubscribe();
  }, [userId.id, route.params.user.id]);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: userId.id,
      sendTo: route.params.user.id,
      createdAt: new Date(),
    };

    try {
      const chatId1 = `${userId.id}${route.params.user.id}`;
      const chatId2 = `${route.params.user.id}${userId.id}`;

      await addDoc(collection(db, "chats", chatId1, "messages"), myMsg);
      await addDoc(collection(db, "chats", chatId2, "messages"), myMsg);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }, [userId.id, route.params.user.id]);

  return (
    <View style={MyStyles.container}>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId.id,
        }}
      />
    </View>
  );
};

export default ChatApp;