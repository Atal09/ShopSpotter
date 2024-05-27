import React, { useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View, Button } from 'react-native';


function Home({navigation}){

    return (
        <View className="flex-1 items-center justify-center bg-white">
        <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Home;

