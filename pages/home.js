import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button } from 'react-native';
import { ThemeContext } from '../components/themecontext';
import 'nativewind';


// const StyledView = styled(View)
// <StyledView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]} className="flex-1 items-center justify-center">
// import 'nativewind';
// import {styled} from "nativewind";

function Home({ navigation }) {
    // const [data, setData] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);

    // useEffect(() => {
    //     fetch('https://stud.hosted.hr.nl/1060857/programmeren%207/items.json')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => console.error(error));
    // }, []);

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]} className="flex-1 items-center justify-center">
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
});

export default Home;
