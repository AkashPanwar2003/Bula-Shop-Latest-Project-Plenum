import { Dimensions, PixelRatio } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Function to save data in AsyncStorage
export const setItemToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log(`Data saved: ${key} = ${value}`);
    } catch (error) {
        console.error(`Error saving data (${key}):`, error);
    }
};

// Function to retrieve data from AsyncStorage
export const getItemFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error retrieving data (${key}):`, error);
        return null;
    }
};

// Function to remove data from AsyncStorage
export const removeItemFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Data removed: ${key}`);
    } catch (error) {
        console.error(`Error removing data (${key}):`, error);
    }
};

export const normalizeFont = size => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

    const scale = SCREEN_WIDTH / 375;

    function normalize(size) {
        const newSize = size * scale;
        if (Platform.OS == 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize));
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
        }
    }

    return normalize(size);
};