import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, register, claims} = useAuthContext();
  const router = useRouter();

  const handleSubmit = async () => {
    if(isRegister){
      await register(email, password);
      setIsRegister(false); 
    } else {
      await login(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {isRegister ? "" : "Back"}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isRegister ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => setIsRegister(!isRegister)}>
        <Text> {isRegister ? "Been here before?" : "New here?" } </Text>
        <Text style={styles.buttonSecondaryText}>{isRegister ? "Login" : "Sign Up!"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSecondary: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  }
});