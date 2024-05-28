import 'react-native-gesture-handler';
import{ createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import Home from "./pages/home";
const Stack = createStackNavigator();
import Navbar from "./components/navbar"
import MapScreen from "./pages/maps";
import Settings from "./pages/settings";
// import { ThemeProvider } from "./pages/settings";


function MyStack() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
    );
}
export default function App() {
  return (
      // <ThemeProvider>
      <NavigationContainer>
          <Navbar />
          <MyStack />
      </NavigationContainer>
          // </ThemeProvider>

  );
}


