import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    //navigation to signup page
    const nav = useNavigation()
    //ensure splash screen only stays on screen for x seconds
    useEffect(() => {
        setTimeout(() => {
            nav.replace('Login')
        }, 5000);
    }, []);

    return (
        <View
            style={{
                backgroundColor: '#013F4F',
                flex: 1,
                justifyContent: 'center'
            }}>
            {//status bar =   battery %, time etc
            }
            <StatusBar style='light'></StatusBar>

            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        height: 400,
                        width: 400,
                        alignSelf: 'flex-start'
                    }}
                    //require is used for local images uri for online imgs
                    source={require('../assets/7.png')}
                />

                <Image
                    style={{
                        height: 115,
                        width: 350
                    }}
                    source={require('../assets/moodscape_logo.png')}
                />
            </View>

            <View style={{ flex: 2 }}>


            </View>

            <View style={{ flex: 3 }}>
                <Image
                    style={{
                        height: 400,
                        width: 400,
                        alignItems: 'flex-end'
                    }}
                    source={require('../assets/8.png')}
                />
            </View>
        </View>

    )
}
export default Splash
