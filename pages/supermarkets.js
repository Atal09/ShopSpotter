import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Supermarkets({ route, navigation }) {
    const { data } = route.params;
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        const loadRatings = async () => {
            try {
                const storedRatings = await AsyncStorage.getItem('ratings');
                if (storedRatings) {
                    setRatings(JSON.parse(storedRatings));
                }
            } catch (error) {
                console.error('Failed to load ratings from AsyncStorage', error);
            }
        };

        loadRatings();
    }, []);

    useEffect(() => {
        const saveRatings = async () => {
            try {
                await AsyncStorage.setItem('ratings', JSON.stringify(ratings));
            } catch (error) {
                console.error('Failed to save ratings to AsyncStorage', error);
            }
        };

        saveRatings();
    }, [ratings]);

    const handleFinishRating = (rating, name) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [name]: rating,
        }));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {data && data.items && data.items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.supermarketContainer}
                        onPress={() => navigation.navigate('MapScreen', { markers: data, selectedMarker: item })}
                    >
                        <Text style={styles.supermarketText}>{item.title}</Text>
                        <AirbnbRating
                            onFinishRating={rating => handleFinishRating(rating, item.title)}
                            defaultRating={ratings[item.title] || 0}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    supermarketContainer: {
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#add8e6',
    },
    supermarketText: {
        fontSize: 18,
    },
});

export default Supermarkets;