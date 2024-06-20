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
     // Tạo chatId dựa trên ID của hai người dùng
    const chatId = `${userId.id}${route.params.user.id}`;

    // Tạo truy vấn Firestore để lấy tin nhắn theo thứ tự giảm dần
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc")
    );

    // Đăng ký lắng nghe thay đổi trên truy vấn
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Chuyển đổi snapshot thành mảng tin nhắn
      const allMessages = snapshot.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      }));
       // Cập nhật state với danh sách tin nhắn mới
      setMessagesList(allMessages);
    });

    // Trả về hàm hủy đăng ký lắng nghe
    return () => unsubscribe();
  }, [userId.id, route.params.user.id]);

  const onSend = useCallback(async (messages = []) => {
      // Lấy tin nhắn đầu tiên từ mảng messages
    const msg = messages[0];
     // Tạo một tin nhắn mới với thông tin người gửi và người nhận
    const myMsg = {
      ...msg,
      sendBy: userId.id,
      sendTo: route.params.user.id,
      createdAt: new Date(),
    };

    try {
      // Tạo hai chatId dựa trên ID của hai người dùng
      const chatId1 = `${userId.id}${route.params.user.id}`;
      const chatId2 = `${route.params.user.id}${userId.id}`;


       // Lưu tin nhắn vào Firestore
      await addDoc(collection(db, "chats", chatId1, "messages"), myMsg);
      await addDoc(collection(db, "chats", chatId2, "messages"), myMsg);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }, [userId.id, route.params.user.id]);

  return (
    //và user._id được thiết lập bằng userId.id để xác định người dùng hiện tại.
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