import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import BottomTabNavigator from './BottomTabNavigator'
const Stack = createNativeStackNavigator()
const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default MainNavigator