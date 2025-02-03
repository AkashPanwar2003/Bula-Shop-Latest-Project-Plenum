import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import ImagePickerComponent from '../../components/ImagePicker';
import { colors } from '../../constants/colors';
import CustomInput from '../../components/Input';
import { getItemFromStorage } from '../../constants/helper';
import { login } from '../../features/auth/authSlice';
// Validation Schema
const profile_schema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    shop_name: Yup.string()
        .min(2, 'Shop Name must be at least 2 characters')
        .required('Shop Name is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profile_schema),
        defaultValues: {
            name: '',
            email: '',
            shop_name: '',
            password: '',
        },
    });

    const handleCreateProfile = async (data) => {
        if (!image) {
            Alert.alert('Profile Image Required', 'Please select a profile image to continue.');
            return;
        }

        // Fetch stored values
        const mpin = await getItemFromStorage('mpin');
        const mobile_number = await getItemFromStorage('mobile_number');

        // Merge image with form data
        const formData = { ...data, image, mpin, mobile_number };

        console.log('Signup Data:', formData);
        dispatch(login({ user: data }))

        // Handle signup logic here (e.g., send data to the server)
    };

    const handleImageSelection = (uri) => {
        setImage(uri);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Profile</Text>


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
                label="Full Name"
                maxLength={20}
                style={styles.input}
            />

            {/* Email Input */}
            <CustomInput
                name="email"
                control={control}
                label="Email (Optional)"
                keyboardType="email-address"
                style={styles.input}
            />
            <CustomInput
                name="shop_name"
                control={control}
                label="Shop Name"
                maxLength={20}
                style={styles.input}
            />

            {/* Password Input */}
            <CustomInput
                name="password"
                control={control}
                label="Password"
                maxLength={16}
                secureTextEntry
                style={styles.input}
            />

            {/* Confirm Password Input */}
            <CustomInput
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                maxLength={16}
                secureTextEntry
                style={styles.input}
            />

            {/* Signup Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(handleCreateProfile)}
                style={styles.signupButton}
                contentStyle={styles.signupButtonContent}
            >
                GET STARTED NOW
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

export default ProfileScreen;
