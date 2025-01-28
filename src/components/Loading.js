import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

export default function Loading(props) {
    const { color, size } = props;
    return (
        <ActivityIndicator size={size || 'large'} color={color} />
    );
}

