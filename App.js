import 'react-native-gesture-handler';
import{ createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import Home from "./pages/home";
import Settings from "./pages/settings";
const Stack = createStackNavigator();
import Navbar from "./components/navbar"


function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />

        </Stack.Navigator>
    );
}
export default function App() {
  return (

      <NavigationContainer>
          <Navbar />
          <MyStack />
      </NavigationContainer>

  );
}


