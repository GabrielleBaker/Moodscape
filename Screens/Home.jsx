import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../Firebase';
import { ListItem } from '@rneui/themed';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    // get data from firestore
    const fetchData = async () => {
      const snapshot = await onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        setItems(data ? Object.values(data) : []);
      });
    };

    fetchData();
  }, []);

  // Sort items in descending order based on the date
  const sortedItems = items.slice().sort((a, b) => new Date(b.date) - new Date(a.date));


  // using react native elements to use list item for nicer ui
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}>
          {item.date.split('T')[0]}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Mood: {item.mood}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Notes: {item.notes}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#013F4F' }}>
      <StatusBar style="light"></StatusBar>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <View>
          <Image
            style={{
              height: 115,
              width: 350,
            }}
            source={require('../assets/moodscape_logo.png')}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            marginTop: 5,
            padding: 20,
            paddingBottom: 1,
            paddingTop: 1,
            color: '#f0fcfc',
          }}>
          Welcome
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            margin: 10,
            paddingTop: 5,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              marginTop: 10,
            }}>
            Recent logs
          </Text>

          <FlatList
            data={sortedItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
