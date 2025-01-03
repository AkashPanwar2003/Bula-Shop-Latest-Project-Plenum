import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import OtpInputs from 'react-native-otp-inputs';
import { colors } from '../../constant/colors';
import { Button } from 'react-native-paper';
import { images } from '../../constant/images';
const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d+$/, 'OTP must be a number')
        .length(4, 'OTP must be exactly 4 digits'),
});

const OtpScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { otp: '' },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log('OTP Submitted:', data);
        navigation.navigate('ResetPassword')
    };

    return (
        <View style={styles.container}>
            <Image source={images.OTP_SCREEN} style={styles.image} />
            <Text style={styles.title}>Enter the OTP</Text>
            <Text style={styles.subtitle}>We've sent a code to your mobile number</Text>

            <Controller
                name="otp"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <OtpInputs
                        inputStyles={styles.otpInput}
                        style={styles.otpContainer}
                        numberOfInputs={4}
                        autofillFromClipboard
                        handleChange={(otp) => {
                            // Ensure numeric input only
                            if (/^\d*$/.test(otp)) {
                                onChange(otp);
                            }
                        }}
                    />
                )}
            />
            {errors.otp && <Text style={styles.errorText}>{errors.otp.message}</Text>}

            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
            // disabled={loading}
            >
                {/* {loading ? (<Loading size='small' color={"#ffffff"} />) : 'Submit'} */}
                Submit
            </Button>
        </View>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: width * 1,
        height: height * 0.4,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    otpContainer: {
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    otpInput: {
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        width: width / 8,
        height: width / 8,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#FFF',
        color: colors.primary,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 8,
    },
    loginButtonContent: {
        paddingVertical: 10,
    },
});
