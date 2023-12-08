import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from "react-native"
import { Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import * as React from "react";
import { Feather } from '@expo/vector-icons';
import Map from "../components/Map";
import { FontAwesome5 } from '@expo/vector-icons';

const Resources = () => {
  //modal
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={{
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
        <Text style={{
          fontSize: 25,
          fontWeight: 500,
          marginTop: 5,
          padding: 20,
          paddingBottom: 1,
          paddingTop: 1,
          color: '#f0fcfc'
        }}>
          Emergency Resources
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            margin: 10,
            borderRadius: 10
          }}>
          <View>
            <Text
              onPress={() => { Linking.openURL('tel:112'); }}
              style={{
                fontSize: 22,
                fontWeight: 500,
              }}>
              Emergency Helpline:
            </Text>
            <Text
              onPress={() => { Linking.openURL('tel:112'); }}
              style={{
                fontSize: 25,
                fontWeight: 500,
                marginTop: 10,
                color: '#00a339'
              }}
            >
              <Ionicons name="call-outline" size={26} color="#00a339" />
              112</Text>

            <Text
              onPress={() => { Linking.openURL('tel:116117'); }}
              style={{
                fontSize: 22,
                fontWeight: 500,
                marginTop: 10,
              }}>
              HUS Helpline:
            </Text>
            <Text
              onPress={() => { Linking.openURL('tel:116117'); }}
              style={{
                fontSize: 25,
                fontWeight: 500,
                marginTop: 10,
                color: '#00a339'
              }}
            >
              <Ionicons name="call-outline" size={26} color="#00a339" />
              116117 </Text>

            <Text
              onPress={() => { Linking.openURL('tel:010195202'); }}
              style={{
                fontSize: 22,
                fontWeight: 500,
                marginTop: 10,
              }}>
              Suicide Hotline Finland:
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 500,
                marginTop: 10,
                color: '#00a339'
              }}
              onPress={() => { Linking.openURL('tel:010195202'); }}>
              <Ionicons name="call-outline" size={26} color="#00a339" />
              010 195 202
            </Text>

            <TouchableOpacity
              onPress={handleModal}
            >
              <Text style={{
                fontSize: 21,
                fontWeight: 500,
                marginTop: 10,
              }}
              >
                Current Location Information
              </Text>
              <FontAwesome5 name="map-marked-alt"
                size={50} color="green" />
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
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    marginTop: 10,
                    paddingBottom: 25
                  }}
                >
                  Current Location
                </Text>
                <Map />
              </View>
            </Modal>

            <Image
              style={{
                marginTop: 20,
                height: 200,
                width: 320
              }}
              source={require('../assets/Cutie.png')}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  )
}
export default Resources