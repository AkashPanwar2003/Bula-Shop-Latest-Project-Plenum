import { Dimensions, PixelRatio } from "react-native";
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
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