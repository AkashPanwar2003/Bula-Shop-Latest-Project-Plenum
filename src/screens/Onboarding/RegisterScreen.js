import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import Loading from '../../components/Loading';
import { colors } from '../../constants/colors';
import EnhancedPhoneInput from '../../components/PhoneInput';
import { images } from '../../constants/images';
import Icon from 'react-native-vector-icons/Ionicons';
import { setItemToStorage } from '../../constants/helper';
const { width, height } = Dimensions.get('window');

// Validation Schema
const register_schema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Phone number is required')
        .min(10, 'Phone number must be at least 10 digits')
        .max(14, 'Phone number must not exceed 14 digits'),
});

const RegisterScreen = ({ navigation }) => {
    const { loading } = useSelector((state) => state.auth);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(register_schema),
        defaultValues: {
            mobile_number: '',
        },
    });

    const handleRegister = async (data) => {
        if (data) {
            await setItemToStorage('mobile_number', data.mobile_number);
            navigation.navigate('Otp', { screen_name: 'register_screen' });
            console.log('Login Data:', data);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Hero Image */}
                <Image source={images.LOGIN_SCREEN} style={styles.image} />

                {/* Title */}
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

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
                    onPress={handleSubmit(handleRegister)}
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

                {/* Terms and Privacy */}
                <Text style={styles.termsText}>
                    By continuing, you agree to our
                    <Text style={styles.linkText}> Terms of Service</Text> &
                    <Text style={styles.linkText}> Privacy Policy</Text>.
                </Text>

                {/* Help Section */}
                <Text style={styles.helpText}>
                    Why do we need your mobile number?
                    <Text style={styles.linkText}> Learn More</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    image: {
        width: width * 0.9,
        height: height * 0.35,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 10,
        elevation: 3, // Adds a shadow for depth
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
    termsText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginTop: 15,
    },
    linkText: {
        color: '#007bff',
        fontWeight: '600',
    },
    helpText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
    },
});

export default RegisterScreen;

