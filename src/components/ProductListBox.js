// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { normalizeFont, windowHeight, windowWidth } from '../constants/helper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import RupeesIcon from 'react-native-vector-icons/FontAwesome';

// import { useNavigation } from '@react-navigation/native';
// import FastImageCaching from '../components/FastImageCaching';
// import { fontFamily } from '../constants/customFonts';
// import { images } from '../constant/images';

// const ProductListing = ({ list, category, unit, handleDeleteProduct }) => {
//     return (

//         <View style={styles.mainBox}>

//             <View style={styles.ProductBox}>
//                 {/* {list?.global_product_id && (
//           <View style={styles.UniversalTag}>
//             <Text style={{ color: 'white', fontFamily: fontFamily.latoBold, fontSize: normalizeFont(12) }}>Global</Text>
//           </View>
//         )} */}
//                 <View style={{ alignItems: 'center', justifyContent: 'center', }}>

//                     <FastImageCaching
//                         image={images.LOGIN_SCREEN}

//                         styles={styles.productImage}
//                         isNotContain={true}
//                     />
//                 </View>
//                 {/* <Image source={product_photo} style={styles.productImage} /> */}

//                 <View style={{ width: '50%', flexDirection: 'column', height: windowHeight * 1 / 10, justifyContent: 'space-evenly', }}>
//                     <Text style={[styles.CommonText]} numberOfLines={1}>{'Basmati Raice'}</Text>
//                     <Text style={[styles.CommonText]} numberOfLines={1}>{'Meal'}</Text>
//                     <Text style={styles.priceText} numberOfLines={1}><RupeesIcon size={normalizeFont(12)} name={'rupee'} />{30}  <Text style={{ color: 'gray' }}>Per/{'kg'}</Text></Text>
//                     <Text style={styles.priceText} numberOfLines={1}>{`${1} ${'kg'}`}</Text>







//                 </View>


//                 <View style={{ flexDirection: 'column', height: windowHeight / 7.8, alignItems: 'center', justifyContent: 'space-evenly' }}>
//                     {list?.global_product_id ? <TouchableOpacity
//                         style={styles.Edit}
//                         onPress={() =>
//                             navigation.navigate('CreateGlobalProductScreen', {
//                                 id: list?.id,
//                                 global_id: list?.global_product_id,
//                             })
//                         }>
//                         <Icon name='create-outline' size={normalizeFont(20)} color={'#FFFFFF'} />
//                     </TouchableOpacity> : <TouchableOpacity
//                         style={styles.Edit}
//                         onPress={() =>
//                             navigation.navigate('CreateProductScreen', {
//                                 id: list?.id,
//                             })
//                         }>
//                         <Icon name='create-outline' size={normalizeFont(20)} color={'#FFFFFF'} />
//                     </TouchableOpacity>}


//                     <TouchableOpacity onPress={() => handleDeleteProduct(list?.id)}
//                         style={styles.Delete}>
//                         {/* <Text style={styles.text}>trash-outline
// </Text> */}
//                         <Icon name='trash-outline' size={normalizeFont(20)} color={'#FFFFFF'} />
//                     </TouchableOpacity>
//                 </View>
//             </View>

//         </View>
//     );
// };

// export default React.memo(ProductListing);

// const styles = StyleSheet.create({
//     mainBox: {
//         marginTop: windowHeight / 45, alignItems: 'center', width: windowWidth * 9 / 10,
//         flexDirection: 'row', justifyContent: 'space-between'


//     },
//     ProductBox: {
//         width: windowWidth * 9 / 10,
//         backgroundColor: 'white',
//         height: windowHeight / 8,
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-evenly',
//         borderWidth: 1

//     },

//     Edit: {
//         backgroundColor: '#3A44A0',
//         width: windowHeight * 0.05, height: windowHeight * 0.05,

//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//         elevation: 8

//     },
//     Delete: {
//         backgroundColor: '#cf4851',
//         width: windowHeight * 0.05, height: windowHeight * 0.05,

//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//         elevation: 8
//     },
//     text: {

//         fontWeight: '500',
//         fontSize: normalizeFont(16),
//         color: 'white',
//         fontFamily: fontFamily.latoBold
//     },

//     fixToText: {

//         marginTop: windowHeight / 80,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         justifyContent: "space-evenly",
//         marginBottom: 5
//     },

//     alignText: {
//         borderWidth: 1,
//         borderColor: 'red',
//         flexDirection: 'column',
//         justifyContent: 'space-between',


//     },
//     priceText: {

//         fontSize: normalizeFont(12),
//         alignItems: 'center',
//         color: 'black',
//         left: 3,
//         fontFamily: fontFamily.latoBold
//     },
//     CommonText: {
//         textTransform: "capitalize",
//         fontSize: normalizeFont(14),
//         padding: 2,
//         color: 'black',
//         fontFamily: fontFamily.latoBold
//     },

//     productImage: {
//         borderRadius: 20, width: windowHeight * 0.1, height: windowHeight * 0.1,
//     },
//     UniversalTag: {
//         position: "absolute",
//         backgroundColor: "#06694d",
//         padding: 2,
//         zIndex: 100000,





//         width: '20%',
//         top: 0,
//         left: 0,
//         height: '25%',
//         borderTopLeftRadius: 7,
//         borderBottomRightRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     // Tag: {
//     //   position: 'absolute',

//     //   bac
//     // }
//     //Test
// });
