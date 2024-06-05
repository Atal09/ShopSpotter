
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./pages/home";
import MapScreen from "./pages/maps";
import Settings from "./pages/settings";
import List from "./pages/list";
import Supermarkets from "./pages/supermarkets";


import { ThemeProvider, ThemeContext } from "./components/themecontext";

const Stack = createStackNavigator();

function MyStack() {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="Supermarkets" component={Supermarkets} />
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
});