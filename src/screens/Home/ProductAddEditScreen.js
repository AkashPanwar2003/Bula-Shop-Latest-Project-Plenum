import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar, Appbar } from 'react-native-paper';

const ProductAddScreen = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onAddProduct = () => {
        if (productName && productPrice) {
            // Simulate adding a product (you can replace it with your API logic)
            setSnackbarMessage('Product added successfully!');
            setVisible(true);

            // Clear inputs
            setProductName('');
            setProductPrice('');
            setProductDescription('');
        } else {
            setSnackbarMessage('Please enter both product name and price!');
            setVisible(true);
        }
    };

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Add Product" />
            </Appbar.Header>

            <ScrollView style={styles.formContainer}>
                <TextInput
                    label="Product Name"
                    value={productName}
                    onChangeText={setProductName}
                    style={styles.input}
                />

                <TextInput
                    label="Price"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <TextInput
                    label="Description"
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                />

                <Button mode="contained" onPress={onAddProduct} style={styles.button}>
                    Add Product
                </Button>
            </ScrollView>

            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={Snackbar.DURATION_SHORT}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 12,
    },
});

export default ProductAddScreen;
