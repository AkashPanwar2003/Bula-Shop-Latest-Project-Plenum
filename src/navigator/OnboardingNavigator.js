import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import IntroScreen from '../screens/Onboarding/IntroScreen';
import ProfileScreen from '../screens/Onboarding/ProfileScreen';
import ForgotPasswordScreen from '../screens/Onboarding/ForgotPasswordScreen';
import OtpScreen from '../screens/Onboarding/OtpScreen';
import ResetPasswordScreen from '../screens/Onboarding/ResetPasswordScreen';
import MPINScreen from '../screens/Onboarding/MpinScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MPin" component={MPINScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default OnboardingNavigator