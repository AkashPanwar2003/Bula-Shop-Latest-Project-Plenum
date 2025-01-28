import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

// MPIN validation schema
const mpinSchema = Yup.object().shape({
    mpin: Yup.string()
        .required('MPIN is required')
        .matches(/^[0-9]+$/, 'MPIN must contain only digits')
        .length(4, 'MPIN must be exactly 4 digits'),
});

const MPINScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(mpinSchema),
        defaultValues: {
            mpin: '',
        },
    });

    const onSubmit = (data) => {
        console.log('MPIN Entered:', data.mpin);
        navigation.navigate('Home'); // Navigate after successful entry
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your MPIN</Text>

            {/* MPIN Input */}
            <Controller
                control={control}
                name="mpin"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        label="MPIN"
                        keyboardType="numeric"
                        secureTextEntry
                        maxLength={4}
                        style={styles.input}
                        error={!!errors.mpin}
                    />
                )}
            />
            {errors.mpin && <Text style={styles.errorText}>{errors.mpin.message}</Text>}

            {/* Submit Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
                contentStyle={styles.submitButtonContent}
            >
                Submit
            </Button>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 10,
        color: colors.primary1,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: colors.primary1,
        borderRadius: 8,
    },
    submitButtonContent: {
        paddingVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
});

export default MPINScreen;
