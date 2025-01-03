import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Button } from 'react-native-paper';
import Loading from '../../components/Loading';
const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action to reset the authentication state
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Home Screen1</Text>
            <Button
                mode="contained"
                loading={loading}
                onPress={handleLogout}
                style={styles.button}
                disabled={loading}
            >
                {loading ? (<Loading />) : 'Logout'}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;
