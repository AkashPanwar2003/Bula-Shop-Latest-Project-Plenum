import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constant/images';

// Define screen dimensions
const { width, height } = Dimensions.get('window');

// Slides configuration
const slides = [
    {
        key: '1',
        title: 'Welcome to Our App',
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        image: images.WELCOME_IMAGE1,
        backgroundColor: '#6A11CB',
    },
    {
        key: '2',
        title: 'Easy to Use',
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        image: images.WELCOME_IMAGE2,
        backgroundColor: '#FF8008',
    },
    {
        key: '3',
        title: 'Get Started',
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        image: images.WELCOME_IMAGE3,
        backgroundColor: '#11998e',
    }
];
const IntroScreen = ({ navigation }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const sliderRef = useRef(null);

    // Handle skip functionality
    const handleSkip = () => {
        // Navigate directly to home screen
        navigation.navigate('Login');
    };

    // Render individual slide
    const renderItem = ({ item }) => (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>

            <View style={styles.content}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>

            </View>
        </View>
    );

    // Custom pagination and navigation
    const renderPagination = (activeIndex) => (
        <View style={styles.paginationContainer}>
            {/* Skip Button */}


            <View style={styles.paginationDots}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === activeIndex ? styles.activeDot : styles.inactiveDot
                        ]}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                {activeIndex < slides.length - 1 ? (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                            sliderRef.current?.goToSlide(activeIndex + 1);
                            setActiveSlide(activeIndex + 1);
                        }}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.getStartedText}>Get Started</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkip}
            >
                <Text style={styles.skipButtonText}>
                    {activeSlide < slides.length - 1 ? 'Skip' : ''}
                </Text>
            </TouchableOpacity>
            <AppIntroSlider
                ref={sliderRef}
                data={slides}
                renderItem={renderItem}
                renderPagination={renderPagination}
                onSlideChange={(index) => setActiveSlide(index)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    content: {
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30,
    },
    image: {
        width: width * 0.7,
        height: height * 0.4,
        marginBottom: 30,
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'black',
    },
    skipButton: {
        position: 'absolute',
        top: 20, // Adjust to ensure it doesn't overlap with content
        right: 20,
        zIndex: 999,
    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    paginationDots: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 20,
    },
    inactiveDot: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    buttonContainer: {
        position: 'absolute',
        right: 20,
    },
    nextButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
    },
    nextButtonText: {
        color: '#6A11CB',
        fontWeight: 'bold',
    },
    getStartedButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
    },
    getStartedText: {
        color: '#6A11CB',
        fontWeight: 'bold',
    },
});

export default IntroScreen;