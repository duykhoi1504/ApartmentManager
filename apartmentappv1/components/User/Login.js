import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert,Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MyStyles from "../../styles/MyStyles";
import { TextInput,Button } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyDispatchContext } from '../../configs/Contexts';
import { Firestore } from 'firebase/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore'
import app from '../../firebaseConfig';
import { isValidPassword, isValidUsername } from '../../Utils/Validations';
import Background from './Background';
import Styles from './Styles';

const Login = () =>{



  const fields=[{
    label:"Tên đăng nhập",
    icon:"text",
    name:"username"
  },{
    label:"Mật khẩu",
    icon:"eye",
    name:"password",
    secureTextEntry:true
  }]
  const[user,setUser]=useState({});
  const [loading,setLoading]=useState(false);
  const [loginError, setLoginError] = useState('');
  const dispatch=useContext(MyDispatchContext)
  const nav= useNavigation();
const [erorUsername,setErrorUsername]=useState('')
const [erorPass,setErrorPass]=useState('')
const[usernameVerify,setUsernameVerify]=useState(false)
const[passwordVerify,setPasswordVerify]=useState(false)
const isValidationOK = () => usernameVerify && passwordVerify

  const db = getFirestore(app);

  const addUserToFirestore = async (user) => {
    try {
      // Thêm người dùng vào collection 'users' trong Firestore
      await addDoc(collection(db, 'users'), user);
      console.log('User added successfully.');
    } catch (error) {
      console.error('Error adding user to Firestore: ', error);

      // Xử lý lỗi nếu cần thiết
    }
  };



  const updateState = (field, value) => {
    setUser(current => {
        return {...current, [field]: value}
    });
}

// useEffect(() => {
//   login();
// }, [erorPass,eroru]);
  const login= async () =>{
    setLoading(true);
    setLoginError('');
    try{
      let res = await APIs.post(endpoints['login'], {
        ...user,
        'client_id': 'ga4gpva8OJ4DDAiZ2MBfH0XkXYiHG02P1Cdq1UUG',
        'client_secret': 'LaMlOXMiVIyFMgawsCqDzAae5rS2RhcEjLTLAQB23sHzZZlIzL7z2zAqJgILhcqpFOzDk713UrYsO67r5HASxjce6fdBh4d1XZ4iczeNzpla8F8kFDeCC86DsbFOvwXS',
        'grant_type': 'password'
      });
      console.info(res.data)
      AsyncStorage.setItem('token',res.data.access_token);

      setTimeout(async () =>{
        let user = await authApi(res.data.access_token).get(endpoints['current-user']);
      console.info(user.data);
      const token = res.data.access_token;
      //dispatch: Được lấy từ MyDispatchContext để dispatch các hành động cập nhật trạng thái người dùng toàn cục.
      dispatch({
        'type': "login",
        'payload': {...user.data,access_token: token}
    })
    
    // Thêm người dùng vào Firestore
    await addUserToFirestore(user.data);
    nav.navigate('Home');


      },100)
      // console.info({
      //   ...user,
      //   'client_id': 'ga4gpva8OJ4DDAiZ2MBfH0XkXYiHG02P1Cdq1UUG',
      //   'client_secret': 'LaMlOXMiVIyFMgawsCqDzAae5rS2RhcEjLTLAQB23sHzZZlIzL7z2zAqJgILhcqpFOzDk713UrYsO67r5HASxjce6fdBh4d1XZ4iczeNzpla8F8kFDeCC86DsbFOvwXS',
      //   'grant_type': 'password'
      // });
    }catch(ex){
      console.error(ex);
      console.error('Response data:', ex.response?.data);
      setLoginError('Tên đăng nhập hoặc mật khẩu không đúng');
      setErrorPass('')
      setErrorUsername('')
      setUsernameVerify(false)
      setPasswordVerify(false)
    }finally{
      setLoading(false)
    }
  }

//   return(
//     <View style={[MyStyles.container, MyStyles.margin]}>
//       <Text style={MyStyles.subject}>ĐĂNG NHẬP NGƯỜI DÙNG</Text>
//       {fields.map(c => (
//         <React.Fragment key={c.id}>
//         <TextInput  
         
//             secureTextEntry={c.secureTextEntry} 
//             value={user[c.name]} 
//             onChangeText={t => {
//               setLoginError('')
//               if (c.name === 'username') {
//                   setErrorUsername(isValidUsername(t)==true ? 'tên đăng nhập hợp lệ' : 'Tên đăng nhập không hợp lệ');
//                   updateState(c.name, t);
//                   setUsernameVerify(isValidUsername(t));
//               } else if (c.name === 'password') {
//                   setErrorPass(isValidPassword(t)==true ? 'mật khẩu hợp lệ' : 'Mật khẩu phải có ít nhất 3 kí tự, ex:P@ssw0rd');
//                   updateState(c.name, t);
//                   setPasswordVerify(isValidPassword(t));
//               }
              
//           }}
//             style={MyStyles.margin} 
//             label={c.label} 
//             left={<TextInput.Icon icon={c.icon}  />} 
//             right={
//               c.name === 'username' && usernameVerify ? (
//                 <TextInput.Icon icon="check-circle" color="green" />
//               ) : c.name === 'password' && passwordVerify ? (
//                 <TextInput.Icon icon="check-circle" color="green" />
//               ) : null
//             }
//           />
        
//         {c.name === 'username' && (
//             <Text style={usernameVerify ? styles.textInput : styles.error}>{erorUsername}</Text>
//           )}
//           {c.name === 'password' && (
//             <Text style={passwordVerify ? styles.textInput : styles.error}>{erorPass}</Text>
//           )}
//         </React.Fragment>
// ))}

// {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

//       <Button disabled={isValidationOK()===false} icon="account" loading={loading} mode="contained" onPress={login}>ĐĂNG NHẬP</Button>
//     </View>
//   )
// }
return (
  <Background>
     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
      <View style={Styles.container}>
        <Text style={Styles.textTitle}>Đăng nhập</Text>
        <View style={[Styles.form, { alignItems: 'center' }, { paddingTop: 100 }]}>
          <Text style={Styles.textContent}>Welcome Back</Text>
          <Text style={Styles.content}>Đăng nhập vào tài khoản của bạn</Text>
          {/* {fields.map(c => <TextInput style={Styles.input} secureTextEntry={c.secureTextEntry} value={user[c.name]} onChangeText={t => updateSate(c.name, t)} key={c.name} label={c.label} right={<TextInput.Icon icon={c.icon} />} />)} */}
          {fields.map(c => (
                <React.Fragment key={c.id}>
                <TextInput  
                  style={Styles.input}
                    secureTextEntry={c.secureTextEntry} 
                    value={user[c.name]} 
                    onChangeText={t => {
                      setLoginError('')
                      if (c.name === 'username') {
                          setErrorUsername(isValidUsername(t)==true ? 'tên đăng nhập hợp lệ' : 'Tên đăng nhập không hợp lệ');
                          updateState(c.name, t);
                          setUsernameVerify(isValidUsername(t));
                      } else if (c.name === 'password') {
                          setErrorPass(isValidPassword(t)==true ? 'mật khẩu hợp lệ' : 'Mật khẩu phải có ít nhất 3 kí tự, ex:P@ssw0rd');
                          updateState(c.name, t);
                          setPasswordVerify(isValidPassword(t));
                      }
                  

                  }}
                  
                    label={c.label} 
                
                    right={
                      c.name === 'username' && usernameVerify ? (
                        <TextInput.Icon icon="check-circle" color="green" />
                      ) : c.name === 'password' && passwordVerify ? (
                        <TextInput.Icon icon="check-circle" color="green" />
                      ) : null
                    }
                  />
                
                {c.name === 'username' && user.username && user.username.length > 0 && (
                  <Text style={usernameVerify ? styles.textInput : styles.error}>{erorUsername}</Text>
                  )}
                {c.name === 'password' && user.password && user.password.length > 0 && (
                  <Text style={passwordVerify ? styles.textInput : styles.error}>{erorPass}</Text>
                  )}
                </React.Fragment>
            ))}
        {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
          <Button 
          disabled={isValidationOK()===false} 
          style={[Styles.button, { marginTop: 20 ,backgroundColor: isValidationOK()===false ? '#B0B0B0' : '#1A4D2E'}]} 
          icon="account"   labelStyle={{ color: 'white' }} 
          loading={loading} mode="contained" 
          onPress={login}>ĐĂNG NHẬP
          </Button>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </Background>
)
}
export default Login

const styles = StyleSheet.create({
  error: {

    color:'red',
    marginBottom:15
  },
  textInput: {
    color: 'green',
   }
  })