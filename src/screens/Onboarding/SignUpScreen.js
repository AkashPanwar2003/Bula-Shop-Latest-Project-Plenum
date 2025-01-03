import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import {
    TextInput,
    Button,
    HelperText
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerComponent from '../../components/ImagePicker';
import { colors } from '../../constant/colors';
import CustomInput from '../../components/Input';

// Validation Schema
const signupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,14}$/, 'Enter a valid phone number')
        .required('Phone number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const SignupScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleSignup = (data) => {
        if (!image) {
            // Display alert if no image is selected
            console.log('Please select an image');
            Alert.alert('Profile Image Required',
                'Please select a profile image to continue.',);
            return;
        }
        // Merge image with form data
        const formData = { ...data, image };

        console.log('Signup Data:', formData);
        // Handle signup logic here (e.g., send data to the server)
    };
    const handleImageSelection = (uri) => {
        setImage(uri);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign Up</Text>


            <ImagePickerComponent
                onImageSelected={(uri) => handleImageSelection(uri)}
                initialImage={image}
                aspectRatio={[1, 1]}
                maxSize={300}
            />
            {/* Name Input */}
            <CustomInput
                name="name"
                control={control}
                label="Name"
                style={styles.input}
            />

            {/* Email Input */}
            <CustomInput
                name="email"
                control={control}
                label="Email"
                keyboardType="email-address"
                style={styles.input}
            />

            {/* Phone Number Input */}
            <CustomInput
                name="phoneNumber"
                control={control}
                label="Phone Number"
                keyboardType="phone-pad"
                style={styles.input}
            />

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
                onPress={handleSubmit(handleSignup)}
                style={styles.signupButton}
                contentStyle={styles.signupButtonContent}
            >
                Sign Up
            </Button>

            {/* Redirect to Login */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginRedirectText}>Already have an account? Login</Text>
            </TouchableOpacity>
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
    imagePicker: {
        alignItems: 'center',
        marginVertical: 15,
    },
    imagePickerText: {
        fontSize: 16,
        color: colors.primary1
    },
    imagePath: {
        textAlign: 'center',
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    signupButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 8,
    },
    signupButtonContent: {
        paddingVertical: 10,
    },
    loginRedirectText: {
        marginTop: 20,
        fontSize: 14,
        color: colors.primary1,
        textAlign: 'center',
    },
});

export default SignupScreen;
