import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuthContext } from '@/hooks/use-auth-context'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false)
  const { login, register} = useAuthContext()

  const router = useRouter()

  const handleSubmit = async () => {
    setError(null);
    if(isRegister){
      try {
        await register(email, password)
        setIsRegister(false)
        router.replace("/getting-started")
      } catch (error: any) {
        setError(error.message)
        setIsRegister(true)
      }
    } else {
      try {
        await login(email, password)
        router.replace("/account")
      } catch (error: any) {
        setError(error.message)
      }
    }
  }

  function handleSwitch() {
    setIsRegister(!isRegister)
    setError(null)
    setEmail("")
    setPassword("")
  }

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

      {error &&
      <View style={styles.buttonSecondary}>
      <Text style= {styles.errorText}>An error has occurred: {error}</Text>
      </View>}

      
      <TouchableOpacity style={styles.buttonSecondary} onPress={handleSwitch}>
        <Text> {isRegister ? "Been here before?" : "New here?" } </Text>
        <Text style={styles.buttonSecondaryText}>{isRegister ? "Login" : "Sign Up!"}</Text>
      </TouchableOpacity>
    </View>
  )
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
  },
  errorText: {
    color: '#d61d1d',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  }
})