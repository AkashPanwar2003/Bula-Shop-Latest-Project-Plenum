import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image
} from 'react-native';
import {
    Button,
} from 'react-native-paper';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { colors } from '../../constants/colors';
import CustomInput from '../../components/Input';
import { images } from '../../constants/images';
const { width, height } = Dimensions.get('window');


// Validation Schema
const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
});

const ForgotPasswordScreen = ({ navigation }) => {
    const { loading } = useSelector((state) => state.auth);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: {
            email: ''
        },
    });

    const handleForgot = (data) => {
        navigation.navigate('Otp')
    };

    return (
        <View style={styles.container}>
            <Image source={images.FORGOT_PASSWORD} style={styles.image} />

            <Text style={styles.title}>Forgot Password</Text>

            {/* Phone Number Input */}
            <CustomInput
                name="email"
                control={control}
                label="Email"
                keyboardType="email-address"
                style={styles.input}
            />
            {/* Login Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(handleForgot)}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                disabled={loading}
            >
                {loading ? (<Loading size='small' color={"#ffffff"} />) : 'Submit'}
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        marginBottom: 15,
        color: colors.primary1,
    },
    image: {
        width: width * 1,
        height: height * 0.4,
        marginBottom: 30,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 8,
    },
    loginButtonContent: {
        paddingVertical: 10,
    },
    forgotPasswordText: {
        marginTop: 20,
        fontSize: 14,
        color: colors.primary1,
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;
