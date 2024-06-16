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
    <View style={styles.container}>
        {hoadon ? (
            <Card style={styles.card}>
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
                    <Text style={styles.totalAmount}>Tổng tiền: {hoadon.tongTien} VND</Text>
                    <Text
                        style={[
                            styles.status,
                            hoadon.status === 'paid' && styles.paid,
                            hoadon.status === 'pending' && styles.pending,
                            hoadon.status !== 'paid' && hoadon.status !== 'pending' && styles.other
                        ]}
                    >
                        Status: {hoadon.status}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        onPress={() => nav.navigate("PaymentScreen", { tongTien: hoadon.tongTien })}
                        disabled={hoadon.status === 'paid'}
                        mode="contained"
                        style={styles.payButton}
                    >
                        Thanh Toán
                    </Button>
                </Card.Actions>
            </Card>
        ) : (
            <ActivityIndicator style={styles.loading} color="#1A4D2E" />
        )}
        <Text style={styles.divider}>--------------------------------------------</Text>
        <Text style={styles.uploadText}>Up ảnh thanh toán(thanh toán ở trên rồi thực hiện up ảnh)</Text>
        <Button onPress={handleChoosePhoto} mode="contained" style={styles.uploadButton}>Up ảnh</Button>
        {image && (
            <Image
                source={{ uri: image }}
                style={styles.uploadedImage}
            />
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
        <Button onPress={handleSubmit} mode="contained" style={styles.submitButton}>Submit</Button>
    </View>
);
}

export default Hoadondetails;

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
  
 
},
card: {
    marginBottom: 20,
    backgroundColor: '#F5EFE6',
},
loading: {
    marginTop: 20,
},
divider: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#4F6F52',
    fontWeight: 'bold',
},
uploadText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#1A4D2E',
    fontWeight: 'bold',
},
uploadButton: {
    backgroundColor: '#4F6F52',
    color: '#FFF',
},
uploadedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
},
error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
},
success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
},
submitButton: {
    backgroundColor: '#1A4D2E',
    color: '#FFF',
    marginTop: 10,
},
totalAmount: {
    fontSize: 18,
    color: '#1A4D2E',
    fontWeight: 'bold',
    marginVertical: 10,
},
status: {
    fontSize: 16,
    color: '#FFF',
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    marginVertical: 10,
},
paid: {
  backgroundColor: '#4F6F52',
  color: 'white',
  fontWeight: 'bold',
},
pending: {
  backgroundColor: '#E8DFCA',
  color: 'black',
  fontWeight: 'bold',
},
other: {
    backgroundColor: 'gray',
},
payButton: {
    backgroundColor: '#4F6F52',
},
});