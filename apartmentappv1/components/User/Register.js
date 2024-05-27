import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import MyStyles from "../../styles/MyStyles";

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleRegister = async () => {
      try {
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          return;
        }
  
        await authClient.register(username, email, password);
        navigation.navigate('Login');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <Button title="Register" onPress={handleRegister} />
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
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    error: {
      color: 'red',
      marginVertical: 10,
    },
  });
  
  export default Register;