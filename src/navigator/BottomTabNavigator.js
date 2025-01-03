import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '../constant/colors';
import MaterialCommunity from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreen1 from '../screens/Home/HomeScreen1';
import HomeScreen2 from '../screens/Home/HomeScreen2';
import HomeScreen3 from '../screens/Home/HomeScreen3';
const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            // initialRouteName="Home"
            shifting={false}
            compact
            // labeled={false}
            activeColor={colors.primary}
            inactiveColor={colors.black}
            barStyle={styles.bar}
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            }}>
            <Tab.Screen
                options={{
                    tabBarLabel: 'DashBoard',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="home" color={color} size={26} />
                    ),
                }}
                name="HomeScreen"
                component={HomeScreen}
            />
            <Tab.Screen
                options={{
                    tabBarColor: 'red',
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="cart" color={color} size={26} />
                    ),
                }}
                name="HomeScreen1"
                component={HomeScreen1}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Suppliers',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="people-outline" color={color} size={26} />
                    ),
                }}
                name="HomeScreen2"
                component={HomeScreen2}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="person-outline" color={color} size={26} />
                    ),
                }}
                name="HomeScreen3"
                component={HomeScreen3}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    bar: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: colors.white,
    },
});