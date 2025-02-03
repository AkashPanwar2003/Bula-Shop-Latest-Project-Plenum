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
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { colors } from '../../constants/colors';
import EnhancedPhoneInput from '../../components/PhoneInput';
import { images } from '../../constants/images';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { setItemToStorage } from '../../constants/helper';

// Validation Schema
const forgotPasswordSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Phone number is required')
        // .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(14, 'Phone number must not exceed 14 digits'),
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
            mobile_number: ''
        },
    });

    const handleForgot = async (data) => {
        if (data) {
            await setItemToStorage('mobile_number', data.mobile_number);
            navigation.navigate('Otp', { screen_name: 'forgot_password' })
            console.log('Login Data:', data);
        }

    };

    return (
        <View style={styles.container}>
            <Image source={images.FORGOT_PASSWORD} style={styles.image} />

            <Text style={styles.title}>Forgot Password</Text>

            {/* Phone Number Input */}
            <Controller
                control={control}
                name="mobile_number"
                render={({ field: { onChange, value } }) => (
                    <EnhancedPhoneInput
                        value={value}

                        onChangeText={onChange}
                        error={errors.mobile_number?.message}
                        placeholder="Enter your phone number"
                    />
                )}
            />
            {/* Login Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(handleForgot)}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
            // disabled={loading}
            >
                {loading ? (
                    <Loading size="small" color="#ffffff" />
                ) : (
                    <View style={styles.buttonContent}>
                        <Icon name="chatbubble-ellipses-outline" size={20} color="#ffffff" style={styles.icon} />
                        <Text style={styles.buttonText}>Send OTP via SMS</Text>
                    </View>
                )}
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
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10, // Space between icon and text
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    forgotPasswordText: {
        marginTop: 20,
        fontSize: 14,
        color: colors.primary1,
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;
