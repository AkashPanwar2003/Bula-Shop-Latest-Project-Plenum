import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { setItemToStorage } from '../../constants/helper';
const MPinScreen = ({ navigation }) => {
    const [pin, setPin] = useState('');

    const handleKeyPress = (value) => {
        if (pin.length < 4) {
            setPin(prev => prev + value);
        }
    };

    const handleBackspace = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleSubmit = async () => {
        if (pin.length === 4) {
            await setItemToStorage('mpin', pin); // Save MPIN to AsyncStorage
            console.log('MPIN Saved:', pin);
            navigation.navigate('Profile');
        } else {
            Alert.alert('Incomplete PIN', 'Please enter a 4-digit MPIN');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your PIN</Text>

            {/* PIN Indicator */}
            <View style={styles.dotsContainer}>
                {[0, 1, 2, 3].map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index < pin.length ? '#ffffff' : '#4f6d7a' }
                        ]}
                    />
                ))}
            </View>

            {/* Number Pad */}
            <View style={styles.numberPadContainer}>
                {/* First Row */}
                <View style={styles.row}>
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity key={num} style={styles.numberKey} onPress={() => handleKeyPress(num.toString())}>
                            <Text style={styles.numberText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Second Row */}
                <View style={styles.row}>
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity key={num} style={styles.numberKey} onPress={() => handleKeyPress(num.toString())}>
                            <Text style={styles.numberText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Third Row */}
                <View style={styles.row}>
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity key={num} style={styles.numberKey} onPress={() => handleKeyPress(num.toString())}>
                            <Text style={styles.numberText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Fourth Row */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.numberKey} onPress={handleBackspace}>
                        <Text style={styles.backspaceText}>{'⌫'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.numberKey} onPress={() => handleKeyPress('0')}>
                        <Text style={styles.numberText}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitKey} onPress={handleSubmit}>
                        <Text style={styles.submitText}>✔</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#204051',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        width: 16,
        height: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#4f6d7a',
    },
    numberPadContainer: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    numberKey: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#3b6978',
        borderRadius: 40,
        elevation: 5,
    },
    numberText: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    backspaceText: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    submitKey: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#84a9ac',
        borderRadius: 40,
        elevation: 5,
    },
    submitText: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default MPinScreen;
