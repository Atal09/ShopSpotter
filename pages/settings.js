import React, { useState, useEffect, useContext} from "react";
import {Button, StyleSheet, Text, View} from 'react-native';

function Settings({navigation}){
//darkmode


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

export default Settings;