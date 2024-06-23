import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ThemeContext } from '../components/themecontext';
import * as Location from 'expo-location';
import { AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add your dark map style here
const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
    }
];

function MapScreen({ route }) {
    const { markers, selectedMarker: initialSelectedMarker } = route.params || {};
    const { isDarkMode } = useContext(ThemeContext);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [ratings, setRatings] = useState({});
    const mapViewRef = useRef(null);
    const [selectedMarker, setSelectedMarker] = useState(initialSelectedMarker);

    // Request location permissions and get current location
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

    // Load ratings from AsyncStorage when the component mounts
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

    // Save ratings to AsyncStorage whenever the ratings state changes
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
    // Animate to the selected marker's region when it changes
    useEffect(() => {
        if (selectedMarker && mapViewRef.current) {
            const { latitude, longitude } = selectedMarker;
            mapViewRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }, 1000);
        }
    }, [selectedMarker]);
    // Handle rating changes and update the state

    const handleFinishRating = (rating, name) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [name]: rating,
        }));
    };

    const initialRegion = {
        latitude: selectedMarker?.latitude || location?.coords.latitude || 51.9225,
        longitude: selectedMarker?.longitude || location?.coords.longitude || 4.47917,
        latitudeDelta: selectedMarker ? 0.001 : 0.0922,
        longitudeDelta: selectedMarker ? 0.001 : 0.0421,
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={isDarkMode ? darkMapStyle : []}
                ref={mapViewRef}
                style={styles.map}
                initialRegion={initialRegion}
            >
                {markers && markers.items.map((marker, index) => (
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
    ratingContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
});

export default MapScreen;