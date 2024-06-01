import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, TouchableRipple, Button, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import APIs, { endpoints } from '../../configs/APIs';
import MyStyles from "../../styles/MyStyles";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const nav = useNavigation();

  const picker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("ApartmentApp", "Permissions Denied!!");
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        setAvatar(res.assets[0]);
      }
    }
  }

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp!");
      setErr(true);
    } else {
      setErr(false);
      setLoading(true);
      try {
        let form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        if (avatar) {
          form.append('avatar', {
            uri: avatar.uri,
            name: avatar.uri.split('/').pop(),
            type: 'image/jpeg' 
          });
        }
        let res = await APIs.post(endpoints['register'], form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (res.status === 201) {
          nav.navigate("Login");
        }
      } catch (ex) {
        console.error(ex);
        if (ex.response && ex.response.status === 400) {
          setErrorMessage("Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.");
          // Bạn có thể truy cập thông tin chi tiết từ ex.response.data nếu cần
        } else {
          setErrorMessage("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
        }
        setErr(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <View style={MyStyles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Text>ĐĂNG KÍ NGƯỜI DÙNG</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={MyStyles.margin}
            label="Tên đăng nhập"
            right={<TextInput.Icon icon="account" />}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={MyStyles.margin}
            label="Email"
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={MyStyles.margin}
            label="Mật khẩu"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={MyStyles.margin}
            label="Xác nhận mật khẩu"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
          <TouchableRipple onPress={picker}>
            <Text style={MyStyles.margin} icon="image">Chọn ảnh đại diện</Text>
          </TouchableRipple>
          {avatar && <Image style={MyStyles.avatar} source={{ uri: avatar.uri }} />}
          <HelperText type="error" visible={err}>
            {errorMessage}
          </HelperText>
          <Button loading={loading} onPress={register} style={MyStyles.margin} mode="contained" icon="account">
            ĐĂNG KÍ
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default Register;


