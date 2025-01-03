import { windowWidth, windowHeight } from './helper'
import { Platform } from 'react-native';
const sizes = {
    btn_size_small: windowWidth * 2 / 10,
    btn_size_medium: windowWidth * 4 / 10,
    btn_size_large: windowWidth * 6 / 10,
    btn_size_full: windowWidth * 9 / 10,
    //  box_height1:windowHeight*6.5/10,
    //  box_height2:Platform.OS=='ios'?windowHeight*1.5/10:windowHeight*1.5/10,
    box_height1: windowHeight * 6.5 / 10,
    box_height2: Platform.OS == 'ios' ? windowHeight * 1.5 / 10 : windowHeight * 1.5 / 10,
    box_height1_withoutTab: windowHeight * 7.5 / 10,
    box_height2_withoutTab: Platform.OS == 'ios' ? windowHeight * 2.5 / 10 : windowHeight * 2.5 / 10,
    big_width_proportion: '95%',
    width_proportion: '90%'
}

export default sizes;