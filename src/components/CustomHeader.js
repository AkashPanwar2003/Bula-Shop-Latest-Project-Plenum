// CustomHeader.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  // Using built-in RN icons
import { fontFamily } from '../constants/customFonts';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CustomHeader = ({ navigation, profileData, text }) => {
    return (
        <View style={styles.headerContainer}>
            {/* Left side - User info */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.welcomeText}>{text || 'Good morning'}</Text>
                <Text numberOfLines={1} style={styles.shopName}>
                    {profileData?.Shop?.shopName || 'Guest user'}
                </Text>
            </View>

            {/* Right side - Profile pic and notification */}
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={() => navigation.navigate('NotificationsListScreen')}
                >
                    <MaterialIcons name="notifications-none" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.profileButton}
                >
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: profileData?.fullImageUrl ||
                                'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight * 0.09,
        paddingHorizontal: 16,
    },
    userInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    welcomeText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
        fontFamily: fontFamily.latoBold
    },
    shopName: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
        marginTop: 2,
        fontFamily: fontFamily.latoBold
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginRight: 20
    },
    notificationButton: {
        padding: 8,
    },
    profileButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
});

export default CustomHeader;
