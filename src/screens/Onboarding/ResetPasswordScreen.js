import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import {
    TextInput,
    Button,
    HelperText
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ImagePickerComponent from '../../components/ImagePicker';
import { colors } from '../../constants/colors';
import CustomInput from '../../components/Input';
import { images } from '../../constants/images';
const { width, height } = Dimensions.get('window');
// Validation Schema
const resetSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ResetPasswordScreen = ({ navigation }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const handleResetPassword = (data) => {

        const formData = { ...data };
        navigation.navigate('Login')
        console.log('Signup Data:', formData);
        // Handle signup logic here (e.g., send data to the server)
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={images.RESET_PASSWORD} style={styles.image} />
            <Text style={styles.title}>Reset Password</Text>

            {/* Password Input */}
            <CustomInput
                name="password"
                control={control}
                label="Password"
                secureTextEntry
                style={styles.input}
            />

            {/* Confirm Password Input */}
            <CustomInput
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                secureTextEntry
                style={styles.input}
            />

            {/* Signup Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(handleResetPassword)}
                style={styles.signupButton}
                contentStyle={styles.signupButtonContent}
            >
                Reset Password
            </Button>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: width * 1,
        height: height * 0.4,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        marginBottom: 15,
    },


    signupButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 8,
    },
    signupButtonContent: {
        paddingVertical: 10,
    },

});

export default ResetPasswordScreen;
