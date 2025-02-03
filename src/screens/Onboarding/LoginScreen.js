import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    TextInput,
    Button,
    useTheme,
    HelperText,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import Loading from '../../components/Loading';
import { colors } from '../../constants/colors';
import EnhancedPhoneInput from '../../components/PhoneInput';
import { images } from '../../constants/images';
import CustomInput from '../../components/Input';
const { width, height } = Dimensions.get('window');


// Validation Schema
const loginSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Phone number is required')
        // .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(14, 'Phone number must not exceed 14 digits'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

});

const LoginScreen = ({ navigation }) => {
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            mobile_number: '',
            password: '',
        },
    });

    const handleLogin = (data) => {
        dispatch(login({ user: data }))
        navigation.navigate('Home')
        console.log('Login Data:', data);
    };

    return (
        <View style={styles.container}>
            <Image source={images.LOGIN_SCREEN} style={styles.image} />
            <Text style={styles.title}>Login</Text>

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
            <CustomInput
                name="password"
                maxLength={16}
                control={control}
                label="Password"
                secureTextEntry
                style={styles.input}
            />
            {/* Login Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(handleLogin)}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                disabled={loading}
            >
                {loading ? (<Loading size='small' color={"#ffffff"} />) : 'Login'}
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.forgotPasswordText}>Don't you have an account? Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
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
        marginBottom: 40,
        color: '#333',
    },
    input: {
        marginBottom: 15,
        color: colors.primary1,
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
    phoneContainer: {
        width: '100%',
        height: 60,
        // marginBottom: 15,
        borderColor: colors.primary,
        borderWidth: 2
    },
    phoneTextContainer: {
        paddingVertical: 10,
    },
});

export default LoginScreen;
