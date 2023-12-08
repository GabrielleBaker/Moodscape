import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database, authentication } from './../Firebase';

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const { email, password } = loginCredentials;
  //toggle visability for password & eye icon
  const [isVisible, setisVisible] = useState(true);
  //navigate to signup&home pages
  const nav = useNavigation();

  const loginUser = () => {
    //signinwithemailandpassword from firebase
    signInWithEmailAndPassword(authentication, email, password).then((val) => {
      //replace prevents user from hitting back to login screen 
      nav.replace('Menu');
    })
      .catch((err) => {
        Alert.alert('Email/Password incorrect');
      });
  }

  return (
    <View style={{
      flex: 1, backgroundColor: '#F5FAF9'
    }}>
      <StatusBar style='dark'></StatusBar>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <Image
          style={{
            margin: 10,
            height: 55,
            width: 50,
            alignSelf: 'center'
          }}
          source={require('../assets/moon.png')}
        />
        <Image
          style={{
            margin: 5,
            height: 50,
            width: 250,
            alignSelf: 'center'
          }}
          source={require('../assets/black_title.png')}
        />
        <View style={{ paddingHorizontal: 20, marginHorizontal: 10, marginTop: 20, borderColor: '#e6e6e8', borderWidth: 1, borderRadius: 20, padding: 20 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 500
          }}>
            Login
          </Text>

          <Text style={{
            color: 'grey',
            marginTop: 10
          }}>
            Enter your email & password
          </Text>

          <Text style={{
            fontSize: 16,
            fontWeight: 500,
            color: 'grey',
            marginTop: 10
          }}>
            Email:</Text>
          <TextInput
            value={email}
            onChangeText={(val) => {
              setLoginCredentials({ ...loginCredentials, email: val })
            }}
            keyboardType='name-phone-pad'
            style={{
              borderColor: '#EAEDEC',
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 5
            }}>
          </TextInput>

          <Text style={{
            fontSize: 16,
            fontWeight: 500,
            color: 'grey',
            marginTop: 10
          }}>
            Password:
          </Text>

          <View style={{ borderColor: '#EAEDEC', borderBottomWidth: 2, flexDirection: 'row' }}>
            <TextInput
              value={password}
              onChangeText={(val) => {
                setLoginCredentials({ ...loginCredentials, password: val })
              }}
              //hide password with securetextentry
              secureTextEntry={isVisible}
              maxLength={6}
              keyboardType='ascii-capable'
              style={{
                fontSize: 17,
                marginTop: 5,
                flex: 0.9,
              }}>
            </TextInput>
            <Ionicons onPress={() =>
              setisVisible(!isVisible)}
              name={isVisible == true ? "eye-off-outline" : "eye-outline"}
              size={22} color="black" />
          </View>
          { //TouchableOpacity is like a button but with more options
          }
          <TouchableOpacity>
            <Text style={{ fontSize: 16, textAlign: 'right', marginTop: 5, fontWeight: 500 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              loginUser}
            style={{
              backgroundColor: '#013F4F',
              marginTop: 30,
              height: 60,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 19,
                color: 'white'
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}>
            <Text style={{ fontSize: 16, }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate('Signup')
              }}>
              <Text
                style={{ fontSize: 16, color: '#013F4F', fontWeight: 600 }}
              > Signup</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}
export default Login
