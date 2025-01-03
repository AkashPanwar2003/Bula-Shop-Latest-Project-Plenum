import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Modal,
    Dimensions,
    Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/colors';

const { width } = Dimensions.get('window');

const ImagePickerComponent = ({
    onImageSelected,
    initialImage,
    aspectRatio = [1, 1],
    maxSize = 300
}) => {
    const [imageUri, setImageUri] = useState(initialImage || null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const cameraPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                );
                const storagePermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );

                if (
                    cameraPermission !== PermissionsAndroid.RESULTS.GRANTED ||
                    storagePermission !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    Alert.alert(
                        'Permissions Required',
                        'Camera and storage permissions are needed to select images.',
                        [{ text: 'OK' }]
                    );
                    return false;
                }
                return true;
            } catch (err) {
                console.error('Permission request error:', err);
                return false;
            }
        }
        return true;
    };

    const selectImageFromGallery = async () => {
        setIsModalVisible(false);
        const hasPermission = await requestPermissions();

        if (!hasPermission) return;

        try {
            const image = await ImagePicker.openPicker({
                width: maxSize,
                height: maxSize,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                includeBase64: false,
                cropperAspectRatio: aspectRatio[0] / aspectRatio[1],
            });

            setImageUri(image.path);
            onImageSelected(image.path);
        } catch (error) {
            if (error.code !== 'E_PICKER_CANCELLED') {
                console.error('Image picker error:', error);
                Alert.alert(
                    'Error',
                    'Unable to select image. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        }
    };

    const takePhotoFromCamera = async () => {
        setIsModalVisible(false);
        const hasPermission = await requestPermissions();

        if (!hasPermission) return;

        try {
            const image = await ImagePicker.openCamera({
                width: maxSize,
                height: maxSize,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                includeBase64: false,
                cropperAspectRatio: aspectRatio[0] / aspectRatio[1],
            });

            setImageUri(image.path);
            onImageSelected(image.path);
        } catch (error) {
            if (error.code !== 'E_PICKER_CANCELLED') {
                console.error('Camera picker error:', error);
                Alert.alert(
                    'Error',
                    'Unable to capture image. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        }
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Icon name="create-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.cameraCircle}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Icon name="camera" size={40} color={'#ffffff'} />
                </TouchableOpacity>
            )}

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Image</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={selectImageFromGallery}
                        >
                            <Icon name="image" size={24} color={colors.primary1} />
                            <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={takePhotoFromCamera}
                        >
                            <Icon name="camera" size={24} color={colors.primary1} />
                            <Text style={styles.modalButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    cameraCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.primary8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.primary1,
        borderStyle: 'dashed',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: colors.primary1,
    },
    editButton: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        backgroundColor: colors.primary1,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary1,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalButtonText: {
        marginLeft: 15,
        fontSize: 16,
        color: colors.primary1,
    },
    cancelButton: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ImagePickerComponent;