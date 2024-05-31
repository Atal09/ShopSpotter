import React, { useContext } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../components/themecontext';

function Settings() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const containerStyle = {
        ...styles.container,
        backgroundColor: isDarkMode ? 'black' : 'white',
    };

    return (
        <View style={containerStyle}>
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Settings;