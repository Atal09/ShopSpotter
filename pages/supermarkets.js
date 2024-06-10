import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function Supermarkets({ route }) {
    const { data } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {data && data.items && data.items.map((item, index) => (
                    <View key={index} style={styles.supermarketContainer}>
                        <Text style={styles.supermarketText}>{item.title}</Text>
                    </View>
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
