import { View, Text, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from '../navigator/BottomTabNavigator'
import { colors } from '../constants/colors'
import CustomHeader from '../components/CustomHeader'
import ProfileScreen from '../screens/Home/CustomersOrderListingScreen'
import ProductAddEditScreen from '../screens/Home/ProductAddEditScreen'
import CalculatorScreen from '../screens/Home/CalculaterScreen'
const { windowWidth, windowHeight } = Dimensions.get('window');

const Stack = createNativeStackNavigator()
const MainNavigator = () => {
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
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={({ navigation }) => ({
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
            })} name="Home" component={BottomTabNavigator} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profile', // Customize the title
                    headerRight: () => (
                        <Button
                            onPress={() => alert('Settings Pressed')}
                            title="Settings"
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="ProductAddEditScreen"
                component={ProductAddEditScreen}
                options={{
                    headerTitle: 'Add Product', // Customize the title
                    headerRight: () => (
                        <Button
                            onPress={() => alert('Settings Pressed')}
                            title="Settings"
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="CalculatorScreen"
                component={CalculatorScreen}
                options={{
                    headerTitle: 'Calculator', // Customize the title
                    headerRight: () => (
                        <Button
                            onPress={() => alert('Settings Pressed')}
                            title="Settings"
                        />
                    ),
                }}
            />


        </Stack.Navigator>
    )
}

export default MainNavigator