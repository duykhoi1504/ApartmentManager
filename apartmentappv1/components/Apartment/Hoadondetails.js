import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet,Text,Image,Alert } from 'react-native';
import { Avatar, Card,Button } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';
import { useNavigation } from '@react-navigation/native';
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
const Hoadondetails = ({ route }) => {


   const [hoadon, setHoadon] = React.useState(null);
   const user = useContext(MyUserContext);
   const nav= useNavigation();

   const [image, setImage] = useState(null);
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState(''); 
   const [status, setStatus] = useState(''); 
   //kiểm tra xem route.params có phải là null hoặc undefined trước khi cố gắng truy cập thuộc tính hoadonID
   const hoadonId = route.params?.hoadonId;


   const loadHoaDon = async () => {
       try {
           let res = await APIs.get(endpoints['hoadon-details'](hoadonId), {
               headers: {
                   'Authorization': `Bearer ${user.access_token}`,
               },
           });
           setStatus(res.data.status)
           setHoadon(res.data);
       } catch (ex) {
           console.error(ex);
       }
   }



   const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("ApartmentApp", "Permissions Denied!!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        
      
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Vui lòng tải lên hình ảnh.');
      return;
    }

    // Hiển thị cảnh báo trước khi đăng bài
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn up ảnh này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            // const cloudinaryURL = await uploadToCloudinary(image); 
            const formData = new FormData();
            formData.append('payment_image', {
              uri: image,
              type: 'image/jpeg',
              name: 'photo.jpg',
            });
                
            try {
                console.log(hoadonId)
              let res = await APIs.patch(endpoints['hoadon-upuynhiemchi'](hoadonId), formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.access_token}`,
                },
              });
              console.log('Success:', res.data);
              setSuccessMessage('Bài viết đã được đăng thành công.');
              setStatus("paid")
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

   React.useEffect(() => {
       if (hoadonId) loadHoaDon();
   }, [hoadonId,status]);



   return (
    <View >
            
        {hoadon ? (
        
            <Card>
                <Card.Title
                    title={hoadon.name}
                    subtitle={hoadon.user.username}
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            source={{ uri: hoadon.user.avatar }}
                        />
                    )}
                />
                <Card.Content>
                    <RenderHTML source={{ html: hoadon.thongTinHD }} />
                    <RenderHTML
                        source={{
                            html: hoadon.dichVu_details.map((dv) => dv.name).join(', '),
                        }}
                    />
                      <Text>tổng tiền: {hoadon.tongTien} VND</Text>
                      <Text
                      style={{
                        backgroundColor:
                          hoadon.status === 'paid'
                            ? 'green'
                            : hoadon.status === 'pending'
                            ? 'red'
                            : 'gray',
                        borderWidth: 2,
                        borderRadius:60,
                        padding: 4,
                      }}>Status: {hoadon.status}
                      </Text>
                </Card.Content>
           
               

                <Card.Actions>
                
                <Button onPress={() => 
                  nav.navigate("PaymentScreen", { tongTien: hoadon.tongTien })} 
                  disabled={hoadon.status === 'paid'} >ThanhToan
                </Button>
                </Card.Actions>
            </Card>
        ) : (
            <ActivityIndicator style={styles.loading} />
        )}

        
        <Text>=======================</Text>
         <Text>Up ảnh thanh toán</Text>
         <Button onPress={handleChoosePhoto}>up ảnh</Button>
        {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}
      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
      {successMessage ? <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text> : null}
      <Button onPress={handleSubmit} >submit</Button>
       
    </View>
);
}
export default Hoadondetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginTop: 20,
    },
});