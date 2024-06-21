import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button } from 'react-native';
import { ThemeContext } from '../components/themecontext';

function List({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1060857/programmeren%207/items.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <Button
                title="Go to map"
                onPress={() => navigation.navigate('MapScreen', { markers: data })}
            />
            <Button
                title="Go to Supermarkets list"
                onPress={() => navigation.navigate('Supermarkets', { data: data })}
            />
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    )
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
});

export default List;
