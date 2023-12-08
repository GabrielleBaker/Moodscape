import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from "react-native"
import React from "react"
import Modal from "react-native-modal";
import { Feather } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { ref, onValue, } from 'firebase/database';
import { database } from '../Firebase'
import { AntDesign } from '@expo/vector-icons';

const Cal = () => {
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);

  //modal show and hide
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  //get data from firebase
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
    })
  }, []);


  const getMarkedDates = () => {
    // date color mapping moods to colors
    const moodColorMapping = {
      depressed: 'blue',
      sad: 'grey',
      neutral: 'yellow',
      happy: 'gold',
      manic: 'purple',
      irritable: 'pink',
      angry: 'red',

    };

    const markedDates = {};
    items.forEach((item) => {
      const date = item.date;
      //make sure its in the correct format for the calendar 
      const formattedDate = date.split('T')[0];

      const mood = item.mood.toLowerCase();
      // Default color is green if mood is not added to a log
      const color = moodColorMapping[mood] || 'green';

      markedDates[formattedDate] = { selected: true, marked: true, selectedColor: color };
    });

    return markedDates;
  };


  return (<View style={{
    flex: 1, backgroundColor: '#013F4F'
  }}>
    <StatusBar style='light'></StatusBar>
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
      <View>
        <Image
          style={{
            height: 115,
            width: 350
          }}
          source={require('../assets/moodscape_logo.png')}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
      }}>
        <Text style={{
          fontSize: 25,
          fontWeight: 500,
          marginTop: 5,
          padding: 20,
          paddingBottom: 1,
          paddingTop: 1,
          color: '#f0fcfc'
        }}>
          Calendar
        </Text>

        <TouchableOpacity
          onPress={handleModal}
        >
          <AntDesign
            name="questioncircleo"
            size={32}
            color="white"
            style={{ paddingRight: 5 }} />
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            margin: 10,
            paddingTop: 5,
            borderRadius: 10,
            height: 500,
          }}>
            <TouchableOpacity
              onPress={handleModal}>
              <Feather name="x-circle" size={40} color="black"
                style={{
                  textAlign: 'right',
                  paddingTop: 8
                }} />
            </TouchableOpacity>
            <ScrollView>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  marginTop: 10,
                  paddingBottom: 5
                }}
              >
                How to use the Calendar
              </Text>
              <Text>
                The calendar tool tracks your mood shifts visually over time by associating each mood with a color.
              </Text>
              <Image
                style={{
                  height: 250,
                  width: 250
                }}
                source={require('../assets/calen.jpg')}
              />
              <Text>
                Here is an example calendar
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  marginTop: 10,
                  paddingBottom: 5
                }}
              >
                Moods and their colors
              </Text>
              <Text>
                While not every mood indicates a manic or depressive episode,
                it can be helpful to track the general trend over time.
              </Text>
              <Image
                style={{
                  height: 250,
                  width: 250
                }}
                source={require('../assets/moodkey.png')}
              />
              <Text>
                Color/Mood chart indicates correlation.
                Note: green indicates a log with no mood recorded.
              </Text>

            </ScrollView>
          </View>
        </Modal>
      </View>


      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          margin: 10,
          borderRadius: 10
        }}>

        <View>

          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            /*basic date marking
            markedDates={{
                '2023-12-12': {selected: true, marked: true, selectedColor: 'blue'},
                '2012-03-02': {marked: true},
                '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
            
            }}*/
            //dynamic date marking using firebase data
            markedDates={getMarkedDates()}
          />

        </View>
      </View>

    </ScrollView>
  </View>
  )
}
export default Cal