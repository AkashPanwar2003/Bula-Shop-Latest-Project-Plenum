// CustomInput.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { colors } from '../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomInput = ({
    name,
    control,
    label,
    rules = {},
    keyboardType = 'default',
    secureTextEntry = false,
    style,
}) => {
    const [showPassword, setShowPassword] = useState(secureTextEntry);
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        value={value}
                        onBlur={onBlur} // Triggers validation on blur
                        onChangeText={onChange}
                        keyboardType={keyboardType}
                        secureTextEntry={showPassword}
                        outlineColor={colors.primary1}
                        activeOutlineColor={colors.primary1}
                        right={
                            secureTextEntry && (
                                <TextInput.Icon
                                    icon={() => (
                                        <Icon
                                            name={showPassword ? 'eye-off' : 'eye'}
                                            color={colors.primary1}
                                            size={26}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    )}
                                />
                            )
                        }
                        // right={<TextInput.Icon icon="eye" />}
                        mode="outlined"
                        style={[styles.input, style]}
                        error={!!error}
                    />
                    {error && (
                        <HelperText type="error" visible>
                            {error.message}
                        </HelperText>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
    },
    input: {
        backgroundColor: '#fff',
    },
});

export default CustomInput;
