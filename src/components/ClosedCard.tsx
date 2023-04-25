import React, { useRef } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Animated, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlowingView from './GlowingView';
import Card from './Card';

const closedCardImage = require('../assets/general/background_card1.jpg');

interface ClosedCardProps {
    disabled?: boolean;
    onPress?: () => void;
    shadow?: boolean;
}

const ClosedCard: React.FC<ClosedCardProps> = ({ disabled = true, onPress, shadow = true }) => {

    return (
        <Card image={closedCardImage} onPress={onPress} shadow={shadow} disabled={disabled}>
        </Card>
    );
};

export default ClosedCard;