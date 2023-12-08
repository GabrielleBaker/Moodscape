import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Screens/Home";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { Entypo, FontAwesome, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import Resources from './Screens/Resources';
import NewLog from './Screens/NewLog';
import Cal from './Screens/Cal';
import Splash from "./Screens/Splash";
import Map from './components/Map';
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
function Menu() {
  return (
    //tab nav gets nested inside stack nav so that once logged in
    //the homepage and following pages have a tab menu 
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}>

      <Tab.Screen
        name="Home" component={Home}
        options={{
          tabBarIcon: () =>
            (<Entypo name="home" size={24} color="black" />)
        }}
      />
      <Tab.Screen
        name="Calendar" component={Cal}
        options={{
          tabBarIcon: () =>
            (<Feather name="calendar" size={24} color="black" />)
        }}
      />
      <Tab.Screen
        name="New Log" component={NewLog}
        options={{
          tabBarIcon: () =>
            (<FontAwesome name="plus" size={24} color="black" />)
        }}
      />

      <Tab.Screen
        name="Resources" component={Resources}
        options={{
          tabBarIcon: () =>
            (<FontAwesome5 name="hands-helping" size={24} color="black" />)
        }}
      />

    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
