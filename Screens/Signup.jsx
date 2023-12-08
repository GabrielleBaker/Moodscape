import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authentication, database } from './../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import SimpleToast from 'react-native-simple-toast';

const Signup = () => {
    const [isVisible, setisVisible] = useState(true);
    //navigation to allow button to login page
    const nav = useNavigation();
    //capture user credentials
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { email, password, name } = userCredentials;
    //create uuid for firestore db
    const uid = uuid.v4()
    //functionality to save user credentials to firebase
    const userAccount = () => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then(() => {
                SimpleToast.show('User account created!');
                nav.navigate('Login');
                setDoc(doc(database, 'users', uid), {
                    username: name,
                    email: email,
                    id: authentication.currentUser.uid
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }

                console.error(error);
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
                        Sign Up
                    </Text>

                    <Text style={{
                        color: 'grey',
                        marginTop: 10
                    }}>
                        Enter your details to continue
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'grey',
                        marginTop: 40
                    }}>
                        Username:</Text>

                    <TextInput
                        value={name}
                        onChangeText={(val) => {
                            setUserCredentials({ ...userCredentials, name: val })
                        }}
                        maxLength={15}
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
                        Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={(val) => {
                            setUserCredentials({ ...userCredentials, email: val })
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
                                setUserCredentials({ ...userCredentials, password: val })
                            }}
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
                    <Text numberOfLines={2}
                        style={{
                            paddingHorizontal: 5,
                            color: 'grey',
                            marginTop: 15,
                            lineHeight: 25,
                            width: '95%'
                        }}>
                        By continuing you agree to our Terms of Service and Privacy Policy
                    </Text>
                    <TouchableOpacity
                        onPress={userAccount}
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
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15
                        }}>
                        <Text style={{ fontSize: 16 }}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate('Login')
                            }}>
                            <Text
                                style={{ fontSize: 16, color: '#013F4F', fontWeight: 600 }}
                            > Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
export default Signup
