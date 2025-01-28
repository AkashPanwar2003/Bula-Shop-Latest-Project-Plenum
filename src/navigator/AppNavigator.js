import { View, Text, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainNavigator from './MainNavigator'
import OnboardingNavigator from './OnboardingNavigator'
import { useSelector, useDispatch } from 'react-redux'
import { colors } from '../constants/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAuthFromStorage, setLoading } from '../features/auth/authSlice'
import CustomHeader from '../components/CustomHeader'
import Loading from '../components/Loading'
const Stack = createNativeStackNavigator()
const { windowWidth, windowHeight } = Dimensions.get('window');
const AppNavigator = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [text, setText] = useState('');
    const profileData = 'Gest User'
    useEffect(() => {
        const today = new Date();
        const curHr = today.getHours();

        if (curHr < 12) {
            setText('Good morning');
        } else if (curHr < 18) {
            setText('Good afternoon');
        } else {
            setText('Good evening');
        }


    }, []);
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

                    <Stack.Screen
                        options={({ navigation }) => ({
                            headerBackTitleVisible: false,
                            headerStyle: {
                                backgroundColor: colors.primary,
                                height: windowHeight * 1 / 10,
                            },
                            headerTitle: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    profileData={profileData}
                                    text={text}
                                />
                            ),
                            headerTitleAlign: 'left',
                            headerLeft: () => null,
                        })}
                        name="MainNavigator"
                        component={MainNavigator}
                    />


                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
