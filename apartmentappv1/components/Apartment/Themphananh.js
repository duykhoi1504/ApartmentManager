import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';
import MyStyles from '../../styles/MyStyles';

const Themphananh = () => {
  const user = useContext(MyUserContext);
  const [name, setName] = useState('');
  const [noiDung, setNoiDung] = useState('');
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

  return (
    <View style={styles.container}>
      <Text style={MyStyles.label}>Tiêu đề phản ánh</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={MyStyles.input}
      />
      <Text style={MyStyles.label}>Nội dung phản ánh</Text>
      <TextInput
        placeholder="Nội Dung"
        value={noiDung}
        onChangeText={setNoiDung}
        style={MyStyles.input}
      />
      <View>
        <Button title="Choose Photo" onPress={handleChoosePhoto} color="#4F6F52" />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      {error ? <Text style={MyStyles.errorText}>{error}</Text> : null}
      {successMessage ? <Text style={MyStyles.successText}>{successMessage}</Text> : null}
      <View style={{marginTop:15}}>
        <Button title="Submit" onPress={handleSubmit} color="#1A4D2E" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5EFE6',
  },
  input: {
    height: 40,
    borderColor: '#1A4D2E',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#E8DFCA',
  },

  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
 
});
export default Themphananh;