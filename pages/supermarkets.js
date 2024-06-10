import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function Supermarkets({ route }) {
    const { data } = route.params;

    return (
        <View style={styles.container}>
            {data && data.items && data.items.map((item, index) => (
                <View key={index} style={styles.supermarketContainer}>
                    <Text style={styles.supermarketText}>{item.title}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    supermarketContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#add8e6',
    },
    supermarketText: {
        fontSize: 18,
    },
});

export default Supermarkets;
