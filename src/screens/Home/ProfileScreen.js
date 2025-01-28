import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={20} color="#FF9A8B" />
            </View>
            <Text style={styles.menuItemText}>{title}</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#CCCCCC" />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const handleLogout = () => {
        // Implement logout logic
        console.log('Logout pressed');
    };

    const handleMenuItemPress = (item) => {
        console.log(`${item} pressed`);
        // Implement navigation or action for each menu item
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            {/* You can replace this with an Image component for actual avatar */}
                            <Icon name="person" size={40} color="#FF9A8B" />
                        </View>
                    </View>
                    <Text style={styles.name}>Robi</Text>
                    <Text style={styles.email}>8967452743</Text>
                    <Text style={styles.email}>robi123@gmail.com</Text>
                </View>

                <View style={styles.menuSection}>
                    <MenuItem
                        icon="time-outline"
                        title="Order History"
                        onPress={() => handleMenuItemPress('Order History')}
                    />
                    <MenuItem
                        icon="location-outline"
                        title="Shipping Address"
                        onPress={() => handleMenuItemPress('Shipping Address')}
                    />
                    <MenuItem
                        icon="create-outline"
                        title="Create Request"
                        onPress={() => handleMenuItemPress('Create Request')}
                    />
                    <MenuItem
                        icon="shield-outline"
                        title="Privacy Policy"
                        onPress={() => handleMenuItemPress('Privacy Policy')}
                    />
                    <MenuItem
                        icon="settings-outline"
                        title="Settings"
                        onPress={() => handleMenuItemPress('Settings')}
                    />
                    <MenuItem
                        icon="log-out-outline"
                        title="Log out"
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF0EE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    menuSection: {
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0EE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    bottomNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#fff',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    activeNavText: {
        color: '#FF9A8B',
    },
});

export default ProfileScreen;