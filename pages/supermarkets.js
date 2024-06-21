import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

function Supermarkets({ route, navigation }) {
    const { data } = route.params;

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
