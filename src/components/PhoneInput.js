import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    LogBox
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { colors } from '../constants/colors';
import { HelperText } from 'react-native-paper';

const { width } = Dimensions.get('window');

LogBox.ignoreLogs(["Support for defaultProps will be removed"]);

const EnhancedPhoneInput = ({
    value = '',
    onChangeText,
    error = '',
    placeholder = 'Enter phone number',
    defaultCode = 'IN',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const phoneInputRef = useRef(null);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputWrapper,
                    isFocused && styles.inputWrapperFocused,
                    error && styles.inputWrapperError
                ]}
            >
                <PhoneInput
                    ref={phoneInputRef}
                    defaultValue={value}
                    defaultCode={defaultCode}
                    layout="first"
                    onChangeFormattedText={onChangeText}
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.phoneTextContainer}
                    flagButtonStyle={styles.flagButton}
                    textInputStyle={styles.phoneInput}
                    textInputProps={{
                        placeholder: placeholder,
                        placeholderTextColor: colors.primary1,
                    }}
                    withShadow={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus={false}
                    codeTextStyle={styles.codeTextStyle}
                    {...props}
                />
            </View>
            {error && (
                <HelperText type="error" visible>
                    {error}
                </HelperText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    inputWrapper: {
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: 3,
        backgroundColor: '#F9F9F9',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputWrapperFocused: {
        borderColor: colors.primary1,
        shadowOpacity: 0.2,
    },
    inputWrapperError: {
        borderColor: 'red',
    },
    phoneContainer: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
    },
    phoneTextContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
    },
    flagButton: {
        width: 60,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    phoneInput: {
        height: 50,
        fontSize: 16,
        color: colors.primary,
    },
    codeTextStyle: {
        fontSize: 14,
        color: colors.primary,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
    },
});

export default EnhancedPhoneInput;