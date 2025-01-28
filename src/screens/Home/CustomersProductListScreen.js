import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Menu, Divider, FAB } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';

const initialProducts = [
    { id: '1', name: 'Wireless Headphones', selPrice: '$120', purPrice: '$100', pcs: '50', image: 'https://www.ortery.com/wp-content/uploads/2019/05/Dawn-Soap-og01.jpg' },
    { id: '2', name: 'Smart Watch', selPrice: '$99', purPrice: '$80', pcs: '30', image: 'https://www.shutterstock.com/image-illustration/grocery-products-isolated-on-white-260nw-241859578.jpg' },
    { id: '3', name: 'Bluetooth Speaker', selPrice: '$80', purPrice: '$60', pcs: '40', image: 'https://img1.exportersindia.com/product_images/bc-full/dir_51/1509902/fmcg-products-1857341.jpg' },
    { id: '4', name: 'Gaming Mouse', selPrice: '$45', purPrice: '$30', pcs: '20', image: 'https://cdni.iconscout.com/illustration/premium/thumb/grocery-illustration-download-in-svg-png-gif-file-formats--shopping-food-store-pack-drink-illustrations-7328923.png' },
    { id: '5', name: 'Bluetooth Speaker', selPrice: '$80', purPrice: '$60', pcs: '40', image: 'https://img1.exportersindia.com/product_images/bc-full/dir_51/1509902/fmcg-products-1857341.jpg' },
];

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState('');
    const [menuVisible, setMenuVisible] = useState(null);

    const handleDelete = (productId) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => setProducts(products.filter((item) => item.id !== productId)) },
        ]);
    };

    const handleUpdate = (productId) => {
        Alert.alert('Update Product', `You can update product with ID: ${productId}`);
    };

    const openMenu = (productId) => setMenuVisible(productId);
    const closeMenu = () => setMenuVisible(null);

    const handleAddProduct = () => {
        navigation.navigate('ProductAddEditScreen')
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderProduct = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.details}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Paragraph>Sell: {item.selPrice}</Paragraph>
                    <Paragraph>Purchase: {item.purPrice}</Paragraph>
                    <Paragraph>Pcs: {item.pcs}</Paragraph>
                </View>
                <Menu
                    visible={menuVisible === item.id}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={() => openMenu(item.id)}>
                            <Ionicons name="options-outline" size={24} color="black" />
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item
                        onPress={() => { closeMenu(); handleUpdate(item.id); }}
                        title="Update"
                        leadingIcon={() => <Ionicons name="create-outline" size={20} color="black" />}
                    />
                    <Divider />
                    <Menu.Item
                        onPress={() => { closeMenu(); handleDelete(item.id); }}
                        title="Delete"
                        leadingIcon={() => <Ionicons name="trash-outline" size={20} color="red" />}
                    />
                </Menu>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.noData}>No products found</Text>}
                contentContainerStyle={{ paddingBottom: 50 }}  // Ensure FAB does not overlap with last item
            />


            {/* Floating Add Product Button */}
            <FAB
                style={styles.fab}
                color='#ffffff'
                icon="plus"
                label="Add Product"
                onPress={handleAddProduct}
            />

        </View>
    );
};

export default ProductListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    searchInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#FFF',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    noData: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
        marginTop: 20,
    },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        margin: 10,
        bottom: 5,
        backgroundColor: colors.primary1,
    },

});
