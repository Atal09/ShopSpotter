// MapScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '../components/themecontext';
import * as Location from 'expo-location';
import { AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MapScreen({ route }) {
    const { markers } = route.params;
    const { isDarkMode } = useContext(ThemeContext);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

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

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const handleFinishRating = (rating, name) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [name]: rating,
        }));
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <MapView style={styles.map}>
                {markers.items.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                        onPress={() => setSelectedMarker(marker)}
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        pinColor="blue"
                        title="My Location"
                    />
                )}
            </MapView>
            {selectedMarker && (
                <View style={styles.ratingContainer}>
                    <Text>{selectedMarker.title}</Text>
                    <AirbnbRating
                        onFinishRating={rating => handleFinishRating(rating, selectedMarker.title)}
                        defaultRating={ratings[selectedMarker.title] || 0}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    ratingContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
});

export default MapScreen;
