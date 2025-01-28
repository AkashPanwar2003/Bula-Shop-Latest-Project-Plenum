import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    LogBox,
    BackHandler,
    RefreshControl,
    Alert,
    StatusBar
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import { colors } from '../../constants/colors';
import sizes from '../../constants/sizes';
import { normalizeFont, windowWidth } from '../../constants/helper';
import { windowHeight } from '../../constants/helper';
import DashboardBox from '../../components/DashBoardBox';
import { images } from '../../constants/images';


LogBox.ignoreLogs(['new NativeEventEmitter']);

const DashboardScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}

        >

            <StatusBar
                backgroundColor='#2e3133'
                barStyle='light-content'
            />
            {/* <HomeTabs pageName="HOME" /> */}

            <View style={styles.box1}>
                <View style={styles.dashboard}>
                    {/* <Text style={styles.dashboardText}>Dashboard</Text> */}
                    <View style={styles.dashboardBox}>
                        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                            <DashboardBox
                                value={20}
                                keyValue={`TOTAL PRODUCT`}
                                imagePath={images.PRODUCTS}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CustomersListScreen')}>
                            <DashboardBox
                                value={40}
                                keyValue={`TOTAL CUSTOMERS`}
                                imagePath={images.CUSTOMERS}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dashboardBox}>
                        <DashboardBox value={35} keyValue={`TODAY'S SALES`} imagePath={images.SALES} />
                        <TouchableOpacity onPress={() => navigation.navigate('CustomersOrderListingScreen', {
                            date: true,
                            type: 'ORDERS'
                        })}>
                            <DashboardBox imagePath={images.ORDER_BOX} value={87} keyValue={`TODAY'S ORDERS`}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dashboardBox}>
                        <DashboardBox value={87} keyValue={`TOTAL SALES`} imagePath={images.SALES} />
                        <DashboardBox value={87} keyValue={`TOTAL ORDERS`} imagePath={images.ORDER_BOX} />
                    </View>

                    <View style={styles.dashboardBox}>

                        {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CustomersOrderListingScreen')}
              >
                <DashboardBox
                  showImg={true}
                  // color="red"
                  // imagePath={images.NEW_ORDER}
                  value={dashboardData?.newOrdersCount || 0}
                  keyValue={`New Orders`}
                  size={42}
                />
  
              </TouchableOpacity> */}
                        {/* {
                            thresholdProducts > 0 &&
                            <>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('StockInventoryScreens', {
                                            thresholdPage: true,
                                        })}
                                >
                                    <DashboardBox
                                        color="red"
                                        value={thresholdProducts}
                                        keyValue={`Threshold${'\n'}Products`}
                                    />
                                </TouchableOpacity>
                            </>
                        } */}
                    </View>

                </View>


            </View>
            {/* {isModalVisible && (
                <CustomModal
                    isVisible={isModalVisible}
                    message={'Hold on! Are you sure you want to exit?'}
                    onOkPress={handleOkPress}
                    onCancelPress={handleCancelPress}
                />
            )} */}
        </ScrollView>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary2,
    },
    box1: {
        width: sizes.width_proportion,
        // borderWidth: 1,
        //  borderColor: 'white',
        paddingBottom: 20,
        alignSelf: 'center',
    },
    dashboard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: windowHeight / 40,
        paddingVertical: 10,
    },
    dashboardText: {
        color: colors.input_text,
        fontSize: normalizeFont(23),
        fontWeight: '700',

    },
    dashboardBox: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: windowHeight / 30,
        // borderWidth: 1,
    },
    chart: {
        flex: 1,
        height: 200,
    },
    dashboardHeaderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginTop: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    welcomeText: {
        color: colors.input_text,
        fontSize: normalizeFont(22),
        marginLeft: 15,
    },

    createButton: {
        width: windowWidth / 2.4,
        height: windowHeight / 15,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: windowHeight / 70,

        borderRadius: 5,
    },
    createButtonText: {
        color: colors.input_text,
        fontSize: normalizeFont(18),
        textAlign: 'center',
        fontWeight: '500',
    },
});
