import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MyStyles from "../../styles/MyStyles";
import { useState } from 'react';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
        try {
            let res=await APIs.get(endpoints['tudodientus']) 
            setUsername(res.data.username);
            setPassword(res.data.password);
          const { token } = response.data;
          await AsyncStorage.setItem('authToken', token);
    
          navigation.navigate('Home');
        } catch (error) {
          console.error('Lỗi đăng nhập:', error);
          // Xử lý lỗi đăng nhập
        }
      };
 return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Login;
