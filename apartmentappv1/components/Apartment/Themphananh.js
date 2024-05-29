import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';

const Themphananh = () => {
  const user= useContext(MyUserContext)
  const [name, setName] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("ApartmentApp", "Permissions Denied!!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || !noiDung || !image) {
      setError('Vui lòng điền đầy đủ thông tin và tải lên hình ảnh.');
      return;
    }

    // Hiển thị cảnh báo trước khi đăng bài
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng bài này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('noiDung', noiDung);
            formData.append('image', {
              uri: image,
              type: 'image/jpeg',
              name: 'photo.jpg',
            });

            try {
              let res = await APIs.post(endpoints['vietphananh'], formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.access_token}`,
                },
              });
              console.log('Success:', res.data);
              setSuccessMessage('Bài viết đã được đăng thành công.');
            } catch (ex) {
              console.error('Error posting:', ex.response?.data || ex.message);
              setError('Có lỗi xảy ra khi đăng bài viết.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

//   const handleSubmit = async () => {
//     if (!name || !noiDung || !image) {
//       setError('Vui lòng điền đầy đủ thông tin và tải lên hình ảnh.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('noiDung', noiDung);
//     formData.append('image', {
//       uri: image,
//       type: 'image/jpeg',
//       name: 'photo.jpg',
//     });

//     try {
//       let res = await APIs.post(endpoints['vietphananh'], formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${user.access_token}`,
//         },
//       });
//       console.log('Success:', res.data);
//       setSuccessMessage('Bài viết đã được đăng thành công.');
//     } catch (ex) {
//     //   console.error('Error posting:', error);
//       console.error('Error posting:', ex.res?.data || ex.message);
//       setError('Có lỗi xảy ra khi đăng bài viết.');
//     }
//   };

  return (
    <View>
        <Text>{user.access_token}</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nội Dung"
        value={noiDung}
        onChangeText={setNoiDung}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
      {successMessage ? <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text> : null}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Themphananh;