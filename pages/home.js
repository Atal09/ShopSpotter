import React, { useState, useEffect, useContext } from "react";
import {StyleSheet, View, Button, Text} from 'react-native';
import { ThemeContext } from '../components/themecontext';
import 'nativewind';


// const StyledView = styled(View)
// <StyledView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]} className="flex-1 items-center justify-center">
// import 'nativewind';
// import {styled} from "nativewind";

function Home({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);



    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]} className="flex-1 items-center justify-center">
            <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Welcome to Supermarket Locator</Text>
            <Button
                title="Go to List"
                onPress={() => navigation.navigate('List')}
            />
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    lightTitle: {
        color: 'black',
    },
    darkTitle: {
        color: 'white',
    },
});

export default Home;
