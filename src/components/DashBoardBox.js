import { Platform, StyleSheet, Text, View, Image, Easing, Animated } from 'react-native';
import React, { useRef } from 'react';
import { colors } from '../constant/colors'
import { windowHeight, normalizeFont, windowWidth } from '../constant/helper';


const DashboardBox = ({ keyValue, value, imagePath, size }) => {


    size = size || 28;



    return (
        <View style={styles.article}>


            <View style={{
                width: windowHeight * 0.05, height: windowHeight * 0.05, backgroundColor: colors.primary, borderRadius: 50, alignItems: "center", justifyContent: 'center', shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 6,
                shadowRadius: 0,
                elevation: 20
            }}>
                <Image source={imagePath} style={[{
                    height: windowHeight * 0.03, width: windowHeight * 0.03,
                }]} />
            </View>
            <View>
                <Text style={[styles.keyValueText]}>{value}</Text>
            </View>
            <View style={styles.bottomDiv}>
                <Text style={styles.keyValueText2} numberOfLines={1}>{keyValue}</Text>
            </View>

        </View>
    );
};





export default DashboardBox;

const styles = StyleSheet.create({
    article: {
        width: windowWidth / 2.35,
        height: windowHeight / 5.2,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.primary2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 25,
        borderWidth: 0.4,
        borderColor: 'gray'
    },
    bottomDiv: {
        flexDirection: "row", justifyContent: "space-between",
    },
    keyValueText: {
        color: 'black',
        fontWeight: '600',
        textAlign: 'right',
        fontSize: normalizeFont(20),
    },
    keyValueText2: {
        color: colors.primary1,
        fontWeight: '500',
        fontSize: normalizeFont(14),
        textAlign: 'center',
        width: '100%',
        textTransform: "capitalize",
        bottom: 10


    }
});
