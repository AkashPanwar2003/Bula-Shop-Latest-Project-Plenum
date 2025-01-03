import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigator from './MainNavigator'
import OnboardingNavigator from './OnboardingNavigator'
import { useSelector, useDispatch } from 'react-redux'
import { colors } from '../constant/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAuthFromStorage, setLoading } from '../features/auth/authSlice'
import Loading from '../components/Loading'
import BottomTabNavigator from './BottomTabNavigator'
const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const storedAuth = await AsyncStorage.getItem('auth');
                if (storedAuth) {
                    const { user, token } = JSON.parse(storedAuth);
                    dispatch(loadAuthFromStorage({ user, token }));
                } else {
                    dispatch(setLoading(false)); // If no auth data, stop loading
                }
            } catch (error) {
                console.error('Failed to load auth state', error);
                dispatch(setLoading(false)); // Stop loading on error
            }
        };

        loadAuth();
    }, [dispatch]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Loading />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated ? 'MainNavigator' : 'Onboarding'}
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.background,
            }}>
            {!isAuthenticated ? (

                <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            ) : (
                <>
                    <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
                    <Stack.Screen name="MainNavigator" component={MainNavigator} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
