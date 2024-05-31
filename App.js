
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./pages/home";
import MapScreen from "./pages/maps";
import Settings from "./pages/settings";
import { ThemeProvider, ThemeContext } from "./components/themecontext";

const Stack = createStackNavigator();

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
        <ThemeProvider>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </ThemeProvider>
    );
}
