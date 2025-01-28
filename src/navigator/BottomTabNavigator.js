import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/Home/DashboardScreen';
import CustomersProductListScreen from '../screens/Home/CustomersProductListScreen';
import StockInventoryScreen from '../screens/Home/StockInventoryScreen';
import CustomersOrderListingScreen from '../screens/Home/CustomersOrderListingScreen';
import SupplierDashboardScreen from '../screens/Home/SupplierDashboardScreen'
import { colors } from '../constants/colors';
const { windowWidth, windowHeight } = Dimensions.get('window');

const Tab = createMaterialBottomTabNavigator();
function MainNavigator() {

    return (
        <Tab.Navigator
            shifting={false}
            compact
            activeColor={colors.primary0}
            inactiveColor={colors.primary1}
            barStyle={styles.bar}
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            }}>
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="home" color={color} size={26} />
                    ),
                }}
                name="DashboardScreen"
                component={DashboardScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Product',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="grid" color={color} size={26} />
                    ),
                }}
                name="Product"
                component={CustomersProductListScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Stock',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name='bag-checked' color={color} size={26} />
                    ),
                }}
                name="Stock"
                component={StockInventoryScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="cart-arrow-down" color={color} size={26} />
                    ),
                }}
                name="Orders"
                component={CustomersOrderListingScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Suppliers',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunity name="account-supervisor-circle" color={color} size={26} />
                    ),
                }}
                name="Suppliers"
                component={SupplierDashboardScreen}
            />
        </Tab.Navigator>
    );
}
export default MainNavigator

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
        backgroundColor: '#ffffff',
    },
});
