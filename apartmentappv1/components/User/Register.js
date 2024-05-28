import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert,Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MyStyles from "../../styles/MyStyles";
import { TextInput, TouchableRipple,Button, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import APIs, { endpoints } from '../../configs/API';
import { useNavigation } from '@react-navigation/native';
const Register = ({ navigation }) => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    const fields=[{
      label:"Tên",
      icon:"text",
      field:"first_name"
    },{
      label:"Họ và Tên lót",
      icon:"text",
      field:"last_name"
    },{
      label:"Tên đăng nhập",
      icon:"text",
      field:"username"
    },{
      label:"Mật khẩu",
      icon:"eye",
      field:"password",
      secureTextEntry:true
    },{
      label:"Xác nhận mật khẩu",
      icon:"eye",
      field:"confirmPassword",
      secureTextEntry:true
    }]
    
    const [user,setUser] = useState({});
    const [loading,setLoading]=useState(false);
    const [err,setErr]= useState(false);
    const nav=useNavigation();


    const picker = async () => {
      const {status}= await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !='granted')
        Alert.alert("ApartmentApp","Permissions Denied!!")
      else{
        let res = await ImagePicker.launchImageLibraryAsync();
        if (!res.canceled)
          change("avatar",res.assets[0]);
      }
    }

    const change= (field,value) =>{
      setUser(current =>{
        return {...current,[field]:value}
      })
    }

    const register = async () =>{
      if (user['password'] !== user['confirmPassword'])
        setErr(true);
      else{
        setErr(false);
        setLoading(true);
        try{
          let form = new FormData();
          
          for (let f in user)
            if(f !=='confirmPassword')
                if(f==='avatar')
                  form.append(f,{
                    uri: user.avatar.uri,
                    name: user.avatar.fileName,
                    type: user.avatar.type
                  });
                else
                  form.append(f,user[f]);
          let res= await APIs.post(endpoints['register'],form,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          if(res.status ===201)
            nav.navigate("Login")
        }catch(ex){
          console.error(ex);
        }finally{
          setLoading(false);
        }
      }
    }

    return(
      <View style={MyStyles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <Text>ĐĂNG KÍ NGƯỜI DÙNG</Text>
            {fields.map(f =><TextInput
              value={user[f.field]}
              onChangeText={t => change(f.field,t)}
              key={f.field}
              style={MyStyles.margin} 
              label={f.label}
              secureTextEntry ={f.secureTextEntry}
              right={<TextInput.Icon icon={f.icon}/> }
              />)}

            <TouchableRipple onPress={picker}>
              <Text style={MyStyles.margin} icon="text">chọn ảnh đại diện</Text>
            </TouchableRipple>

            {user.avatar && <Image style={MyStyles.avatar} source={{uri:user.avatar.uri}} />}

            <HelperText type="error" visible={err}>
                        Mật khẩu không khớp!
              </HelperText>
            
            <Button loading={loading} onPress={register} style={MyStyles.margin} mode="contained"  icon="account">ĐĂNG KÍ</Button>
          </ScrollView>
         </KeyboardAvoidingView>
      </View>

    )
    // return (
    //   <View style={styles.container}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Username"
    //       value={username}
    //       onChangeText={setUsername}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       keyboardType="email-address"
    //       value={email}
    //       onChangeText={setEmail}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       secureTextEntry
    //       value={password}
       
    //       onChangeText={setPassword}
          
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Confirm Password"
    //       secureTextEntry
    //       value={confirmPassword}
    //       onChangeText={setConfirmPassword}
    //     />
    //     {errorMessage ? (
    //       <Text style={styles.error}>{errorMessage}</Text>
    //     ) : null}
    //     <Button title="Register" onPress={handleRegister} />
    //   </View>
    // );
  };
  
  const styles = StyleSheet.create({
    error: {
      color: 'red',
      marginVertical: 10,
    },
  });
  
  export default Register;