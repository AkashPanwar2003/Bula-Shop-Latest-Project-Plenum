import { loadAuthFromStorage } from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeAuth = () => async (dispatch) => {
    try {
        const storedAuth = await AsyncStorage.getItem('auth');
        if (storedAuth) {
            const { user, token } = JSON.parse(storedAuth);
            dispatch(loadAuthFromStorage({ user, token }));
        }
    } catch (error) {
        console.error("Failed to load authentication state", error);
    }
};
