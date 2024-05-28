import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

function Home({navigation}){

    const [data, setData] = useState([]);

    //fetching studhosted
    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1060857/programmeren%207/items.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Button
                title="Go to Map"
                onPress={() => navigation.navigate('MapScreen', { markers: data })}
            />
            <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings', { markers: data })}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Home;