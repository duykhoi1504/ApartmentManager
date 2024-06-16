import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, TouchableRipple, Button, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import APIs, { endpoints } from '../../configs/APIs';
import MyStyles from "../../styles/MyStyles";
import Background from './Background';
import Styles from './Styles';
import { isValidUsername,isValidEmail,isValidPassword,isValidConfirmPassword } from '../../Utils/Validations';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [errorUsername,setErrorUsername]=useState('')
  // const [errorPassword,setErrorPassword]=useState('')
  // const [errorConfirmPassword,setErrorConfirmPassword]=useState('')

  const[usernameVerify,setUsernameVerify]=useState(false)
  const[passwordVerify,setPasswordVerify]=useState(false)
  const[emailVerify,setEmailVerify]=useState(false)
  const[confirmPasswordVerify,setConfirmPasswordVerify]=useState(false)
  const isValidationOK = () => usernameVerify && passwordVerify && emailVerify && confirmPasswordVerify
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
          Alert.alert("Đăng ký thành công!", "Nhấn OK để chuyển đén trang Login", [
            { text: "OK", onPress: () => nav.navigate("Login") }
          ]);
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

  useEffect(() => {
    setConfirmPasswordVerify(isValidConfirmPassword(password, confirmPassword));
  }, [password, confirmPassword]);

  return (
    <Background>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView >
        <View style={Styles.container}>
          <Text style={Styles.textTitle}>Đăng kí</Text>
          <View style={[Styles.form, { paddingTop: 50 }]}>
            <TextInput
              value={username}
              onChangeText={ t =>{
                setUsername(t)
                setUsernameVerify(isValidUsername(t))
              }}
              style={Styles.input}
              label="Tên đăng nhập"
              right={
              username.length<1? <TextInput.Icon icon="account" /> : usernameVerify ? (
                  <TextInput.Icon icon="check-circle" color="green" />
                ):(
                  <TextInput.Icon icon="close-circle" color="red" />
                )
              
              }
             
            />
            <TextInput
              value={email}
              onChangeText={t=>{
                setEmail(t)
                setEmailVerify(isValidEmail(t))
                }
              }
              style={Styles.input}
              label="Email"
              right={email.length<1? <TextInput.Icon icon="email" /> : emailVerify ? (
                <TextInput.Icon icon="check-circle" color="green" />
              ):(
                <TextInput.Icon icon="close-circle" color="red" />
              )
              }
            />
            <TextInput
              value={password}
              onChangeText={t =>{
                setPassword(t)
                setPasswordVerify(isValidPassword(t))
                }}
              style={Styles.input}
              label="Mật khẩu"
              secureTextEntry={!showPassword} 
              right={password.length<1? <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)}/> : passwordVerify ? (
                <TextInput.Icon icon={showPassword ? "eye-off" : "check-circle"} onPress={() => setShowPassword(!showPassword)} color="green" />
              ):(
                <TextInput.Icon icon={showPassword ? "eye-off" : "close-circle"} onPress={() => setShowPassword(!showPassword)} color="red" />
              )}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={t=>{
                setConfirmPassword(t)
              
              }}
              style={Styles.input}
              label="Xác nhận mật khẩu"
              secureTextEntry={!showConfirmPassword} 
              right={confirmPassword.length<1? <TextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showPassword)}/> : confirmPasswordVerify ? (
                <TextInput.Icon icon={showConfirmPassword ? "eye-off" : "check-circle"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} color="green" />
              ):(
                <TextInput.Icon icon={showConfirmPassword ? "eye-off" : "close-circle"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} color="red" />
              )}
            />
            <TouchableRipple onPress={picker}>
              <Text style={[Styles.content, { alignSelf: 'center', paddingTop: 5 }]} icon="image">Chọn ảnh đại diện</Text>
            </TouchableRipple>
            {avatar && <Image style={[MyStyles.avatar, { alignSelf: 'center' }]} source={{ uri: avatar.uri }} />}
            <HelperText type="error" visible={err}>
              {errorMessage}
            </HelperText>
            <Button 
            disabled={isValidationOK()===false}  
            loading={loading} 
            onPress={register} 
            style={[Styles.button,{backgroundColor: isValidationOK()===false ? '#B0B0B0' : '#1A4D2E'}]} mode="contained" icon="account">
              ĐĂNG KÍ
            </Button>
          </View>
        </View>
        </ScrollView> 
      </KeyboardAvoidingView>
    </Background>
  )
};
export default Register;

