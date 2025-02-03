import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [operand, setOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [isNewInput, setIsNewInput] = useState(false);

    const pressButton = (value) => {
        if (isNewInput) {
            setDisplay(value);
            setIsNewInput(false);
        } else {
            setDisplay(display === '0' ? value : display + value);
        }
    };

    const pressOperator = (operation) => {
        if (operator && operand !== null) {
            calculate();
        }
        setOperand(parseFloat(display));
        setOperator(operation);
        setIsNewInput(true);
    };

    const calculate = () => {
        if (operator && operand !== null) {
            const num = parseFloat(display);
            let result;
            switch (operator) {
                case '+':
                    result = operand + num;
                    break;
                case '-':
                    result = operand - num;
                    break;
                case '*':
                    result = operand * num;
                    break;
                case '/':
                    result = num !== 0 ? operand / num : 'Error';
                    break;
                default:
                    return;
            }
            setDisplay(result.toString());
            setOperand(result);
            setOperator(null);
            setIsNewInput(true);
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
        setOperand(null);
        setOperator(null);
        setIsNewInput(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.display}>
                <Text style={styles.displayText}>{display}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                {['7', '8', '9', '/'].map((item) => (
                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={() => item === '/' ? pressOperator(item) : pressButton(item)}
                        buttonColor={item === '/' ? '#FFA726' : '#1976D2'}
                    >
                        {item}
                    </Button>
                ))}
                {['4', '5', '6', '*'].map((item) => (
                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={() => item === '*' ? pressOperator(item) : pressButton(item)}
                        buttonColor={item === '*' ? '#FFA726' : '#1976D2'}
                    >
                        {item}
                    </Button>
                ))}
                {['1', '2', '3', '-'].map((item) => (
                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={() => item === '-' ? pressOperator(item) : pressButton(item)}
                        buttonColor={item === '-' ? '#FFA726' : '#1976D2'}
                    >
                        {item}
                    </Button>
                ))}
                {['0', '.', '+', '='].map((item) => (
                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={() =>
                            item === '=' ? calculate() : item === '+' ? pressOperator(item) : pressButton(item)}
                        buttonColor={item === '+' || item === '=' ? '#FFA726' : '#1976D2'}
                    >
                        {item}
                    </Button>
                ))}
                <Button mode="contained" style={styles.clearButton} labelStyle={styles.clearButtonText} onPress={clearDisplay}>
                    C
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
        padding: 20,
    },
    display: {
        width: '90%',
        padding: 20,
        backgroundColor: '#263238',
        borderRadius: 10,
        alignItems: 'flex-end',
        marginBottom: 20,
        elevation: 5,
    },
    displayText: {
        fontSize: 40,
        color: '#FFFFFF',
    },
    buttonsContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        width: '30%',
        margin: 5,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 22,
        color: '#FFFFFF',
    },
    clearButton: {
        width: '95%',
        marginTop: 10,
        backgroundColor: '#D32F2F',
        borderRadius: 8,
    },
    clearButtonText: {
        fontSize: 22,
        color: '#FFFFFF',
    },
});

export default Calculator;
