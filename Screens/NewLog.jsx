import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Platform, Image, Text, View, Button, TextInput, FlatList, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { push, ref, onValue } from 'firebase/database';
import { database } from '../Firebase'
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';

const NewLog = () => {
    const [amount, setAmount] = useState('');
    const [items, setItems] = useState([]);
    const [notes, setNotes] = useState('');

    const nav = useNavigation();
    //slider
    const [value, setValue] = useState(0);
    const [mood, setMood] = useState([
        'depressed',
        'sad',
        'neutral',
        'happy',
        'manic',
        'irritable',
        'angry'
    ])

    //date picker 
    const [logdate, setLogdate] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    //to toggle date picker visible on press
    const switchDatePicker = () => {
        setShowPicker(!showPicker);
    }
    //on change
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            //check if android, datepicker has platform specific code
            //this code only workds for android
            if (Platform.OS === "android") {
                switchDatePicker();
                setLogdate(currentDate.toISOString());
            }
        }
        else {
            switchDatePicker();
        }
    }
    //get db data
    useEffect(() => {
        const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            setItems(Object.values(data));
        })
    }, []);


    //save data to firebase database
    const saveItem = () => {
        push(ref(database, 'items/'), { 'date': logdate, 'mood': amount, 'notes': notes });
        SimpleToast.show('Log successfully saved!')
        nav.navigate('Home')
    }


    return (
        <View style={{
            flex: 1, backgroundColor: '#013F4F'
        }}>
            <StatusBar style='light'></StatusBar>
            <ScrollView style={{
                flex: 1, backgroundColor: '#013F4F', marginTop: 50
            }}>

                <View >
                    <Image
                        style={{
                            height: 115,
                            width: 350
                        }}
                        source={require('../assets/moodscape_logo.png')}
                    />
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 500,
                        marginTop: 5,
                        padding: 20,
                        paddingBottom: 1,
                        paddingTop: 1,
                        color: '#f0fcfc'
                    }}>
                        New Mood-Log
                    </Text>
                </View>
                <SafeAreaView
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 15,
                        paddingLeft: 20,
                        paddingRight: 20,
                        margin: 10
                    }}>
                    <View>

                        <Image
                            style={{
                                height: 160,
                                width: 300,
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 1
                            }}
                            source={require('../assets/hammie.png')}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                marginLeft: 10
                            }}
                        > Date</Text>
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChange}
                                maximumDate={new Date}
                            ></DateTimePicker>

                        )}
                        {!showPicker && (
                            <Pressable
                                onPress={switchDatePicker}
                            >
                                <TextInput placeholder='Date'
                                    value={logdate.split('T')[0]}
                                    onChangeText={setLogdate}
                                    editable={false}
                                    style={{
                                        backgroundColor: '#EAEDEC',
                                        padding: 10,
                                        borderRadius: 5,
                                        margin: 15,
                                        borderBottomWidth: 2,
                                        marginTop: 1
                                    }}
                                />
                            </Pressable>
                        )}
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                marginLeft: 13
                            }}
                        >
                            Mood </Text>
                        <Image
                            style={{
                                width: '100%',
                                height: 50,
                                margin: 5
                            }}
                            source={require('../assets/mood.png')}
                        />
                    </View>
                    <View>
                        <Slider
                            // sstyle={{width: 500, height: 80}}
                            step={1}
                            minimumValue={0}
                            maximumValue={6}
                            minimumTrackTintColor="blue"
                            maximumTrackTintColor="grey"
                            value={value}
                            onSlidingComplete={value => [setValue(value), setAmount(mood[value])]}
                        />

                        <TextInput placeholder={mood[value]}
                            editable={false}
                            onChangeText={value => setAmount(mood[value])}
                            style={{
                                backgroundColor: '#EAEDEC',
                                padding: 10,
                                borderRadius: 5,
                                marginLeft: 15,
                                marginRight: 15,
                                borderBottomWidth: 2,
                                fontSize: 16,
                                marginTop: 10
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15, marginBottom: 15 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 500,
                                marginLeft: 13
                            }}>Notes </Text>
                        <TextInput placeholder='Notes'
                            onChangeText={text => setNotes(text)}
                            style={{
                                backgroundColor: '#EAEDEC',
                                padding: 10,
                                borderRadius: 5,
                                marginLeft: 15,
                                marginRight: 15,
                                borderBottomWidth: 2,
                                fontSize: 16,
                                marginTop: 2,
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                        <TouchableOpacity
                            onPress={() => saveItem(logdate, amount, notes)}
                            style={{
                                backgroundColor: '#013F4F',
                                marginTop: 10,
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
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default NewLog