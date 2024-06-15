import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, Text, ScrollView, Alert } from 'react-native';
import { VietQR } from 'vietqr';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { MyUserContext } from '../../configs/Contexts';
const PaymentScreen = ({route}) => {
    const [qrCodeData, setQRCodeData] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [listBank, setListBank] = useState([]);
  const [amount, setAmount] = useState(route.params?.tongTien || '');
  const [accountNumber, setAccountNumber] = useState('');
  const [memo, setMemo] = useState('');
  const [listTemplates, setListTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const user= useContext(MyUserContext)
  const vietQR = new VietQR({
    clientID: 'b11fb921-5977-45b6-950c-36756b355ee3',
    apiKey: '1bc63609-d5e3-4015-9149-e4068bc0a055',
  });


  
  const handlePayment = async () => {
    try {

      // Fetch the list of supported banks
      const response = await vietQR.getBanks();
      if (response.code === '00') {
        setListBank(response.data);
        // console.log('Supported banks:', response.data);
      } else {
        console.error('Failed to fetch banks:', response.desc);
      }

      // // Fetch the list of available templates
      // const templates = await vietQR.getTemplate();
      // console.log('Available templates:', templates);


      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      const clientID = 'b11fb921-5977-45b6-950c-36756b355ee3';
      const apiKey = '1bc63609-d5e3-4015-9149-e4068bc0a055';  
      //tk ngan hang của chủ chung cư
      const accountThuHuong=7104205296956;

      const url = 'https://api.vietqr.io/v2/generate';

      const headers = {
        'x-client-id': clientID,
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      };

      // const requestBody = {
      //   accountNo: accountThuHuong,
      //   accountName: 'QUY VAC XIN PHONG CHONG COVID',
      //   acqId: '970405',
      //   addInfo: 'Ung Ho Quy Vac Xin',
      //   amount: '79000',
      //   template: 'compact2'
      // };

   const requestBody = {
        accountNo: accountThuHuong,
        accountName: 'chuyen khoan',
        acqId: selectedBank,
        addInfo: memo,
        amount: amount,
        template: 'compact2'
      };

      const response = await axios.post(url, requestBody, { headers });

      console.log('QR Code Data:', response.data);
      setQRCodeData(response.data);

      // Handle the response data accordingly
      if (response.data.code === '00') {
        // Process the successful response
      } else {
        console.error('Failed to generate QR code:', response.data.desc);
        showErrorAlert(`Đã có lỗi xảy ra khi tạo mã QR: ${response.data.desc}`);
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorAlert();
    }
};
  
const showErrorAlert = (message = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.') => {
  Alert.alert(
    'Lỗi',
    message,
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const changeValue = (value, callback) => {
  callback(value);
}

const alert_handleGenerateQRCode = () => {
  if (!selectedBank || !accountNumber || !memo || !amount) {
    Alert.alert(
      'Chưa chọn dịch vụ',
      'Vui lòng điền đầy đủ thông tin trước khi xác nhận.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  } else {
    handleGenerateQRCode();
  }
};

  useEffect(() => {
    // console.log("tongtien:",amount)
  handlePayment();

  }, [selectedBank,accountNumber,amount]);
  return (
    <View>
      <ScrollView>
      {/* <Button title="Pay" onPress={handlePayment} /> */}
      <Text>Chọn ngân hàng</Text>
      <Picker
        selectedValue={selectedBank}
        onValueChange={(itemValue) => setSelectedBank(itemValue)}
      >
        {listBank.map((bank) => (
          <Picker.Item key={bank.id} label={bank.name} value={bank.bin} />
        ))}
      </Picker>

      


      <Text >Số tài khoản</Text>
      <TextInput   
       
        placeholder="Số tài khoản"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <Text >Nhập nội dung</Text>
      <TextInput 
       
        placeholder="Nhập nội dung"
        value={memo}
        onChangeText={setMemo}
        keyboardType="text"
      />
      <Text >Số tiền</Text>
      <TextInput 
       
       placeholder={`${amount}`}
        value={amount}
        // onChangeText={value=>{setAmount(value)}}
        keyboardType="numeric"
        editable={false}
      />

{/* <Button title="Pay" onPress={() => {
  console.log(selectedBank.name)
  console.log(accountNumber)
  console.log(memo)
  console.log(amount)

}
  } />

   <Text>==========================</Text>
      <Text>{selectedBank.name}</Text>
      <Text>{accountNumber}</Text>
      <Text>{memo}</Text>
      <Text>{amount}</Text>
   

  <Text>==========================</Text> */}




<Text>Generate QR Code Screen</Text>
      <Button title="Generate QR Code" onPress={alert_handleGenerateQRCode} />
      {qrCodeData && qrCodeData.data && (
        <View>
          <Text>QR Code Image:</Text>
          <Image
            source={{ uri: qrCodeData.data.qrDataURL }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}


</ScrollView>
    </View>
  );
};

export default PaymentScreen;
