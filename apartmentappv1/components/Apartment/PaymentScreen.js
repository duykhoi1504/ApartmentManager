import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { VietQR } from 'vietqr';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
const PaymentScreen = () => {
    const [qrCodeData, setQRCodeData] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [listBank, setListBank] = useState([]);
//   const [amount, setAmount] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [memo, setMemo] = useState('');
//   const [listTemplates, setListTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState('');
  const handlePayment = async () => {
    try {
      const vietQR = new VietQR({
        clientID: 'b11fb921-5977-45b6-950c-36756b355ee3',
        apiKey: '1bc63609-d5e3-4015-9149-e4068bc0a055',
      });

      // Fetch the list of supported banks
      const response = await vietQR.getBanks();
      if (response.code === '00') {
        setListBank(response.data);
        // console.log('Supported banks:', response.data);
      } else {
        console.error('Failed to fetch banks:', response.desc);
      }

    //   // Fetch the list of available templates
    //   const templates = await vietQR.getTemplate();
    //   console.log('Available templates:', templates);

    //   // Generate the link code
    //   const qrCodeData = await vietQR.genQuickLink({
    //     bank: '970415',
    //     accountName: 'QUY VAC XIN PHONG CHONG COVID',
    //     accountNumber: '113366668888',
    //     amount: '79000',
    //     memo: 'Ung Ho Quy Vac Xin',
    //     template: 'compact', 
    //     media: '.jpg' 
    //   });




    //   setQrCodeBase64(qrCodeData);
    //   console.log(qrCodeBase64)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      const clientID = 'b11fb921-5977-45b6-950c-36756b355ee3';
      const apiKey = '1bc63609-d5e3-4015-9149-e4068bc0a055';  
      const accountThuHuong=7104205296956;

      const url = 'https://api.vietqr.io/v2/generate';

      const headers = {
        'x-client-id': clientID,
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      };

      const requestBody = {
        accountNo: accountThuHuong,
        accountName: 'QUY VAC XIN PHONG CHONG COVID',
        acqId: '970405',
        addInfo: 'Ung Ho Quy Vac Xin',
        amount: '79000',
        template: 'compact'
      };

      const response = await axios.post(url, requestBody, { headers });

      console.log('QR Code Data:', response.data);
      setQRCodeData(response.data);

      // Handle the response data accordingly
      if (response.data.code === '00') {
        // Process the successful response
      } else {
        console.error('Failed to generate QR code:', response.data.desc);
      }
    } catch (error) {
      console.error('Error:', error);
    }
};
  

  useEffect(() => {
  handlePayment();

  }, []);
  return (
    <View>
      <Button title="Pay" onPress={handlePayment} />
      
      <Picker
        selectedValue={selectedBank}
        onValueChange={(itemValue) => setSelectedBank(itemValue)}
      >
        {listBank.map((bank) => (
          <Picker.Item key={bank.id} label={bank.name} value={bank.code} />
        ))}
      </Picker>
      
      {/* <Text >Số tài khoản</Text>
      <TextInput 
       
        placeholder="Số tài khoản"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      /> */}

<Text>Generate QR Code Screen</Text>
      <Button title="Generate QR Code" onPress={handleGenerateQRCode} />
      {qrCodeData && qrCodeData.data && (
        <View>
          <Text>QR Code Image:</Text>
          <Image
            source={{ uri: qrCodeData.data.qrDataURL }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}



    </View>
  );
};

export default PaymentScreen;
