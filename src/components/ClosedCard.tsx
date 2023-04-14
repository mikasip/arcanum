import React, { useRef } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Animated, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlowingView from './GlowingView';
import Card from './Card';

const closedCardImage = require('../assets/general/background_card1.jpg');

interface ClosedCardProps {
    width: string;
    margin: string;
    disabled: boolean;
    onPress?: () => void;
    shadow?: boolean;
}

const ClosedCard: React.FC<ClosedCardProps> = ({ width, margin, disabled = false, onPress, shadow = true }) => {

    return (
        <Card image={closedCardImage} onPress={onPress} width={width} margin={margin} shadow={shadow} disabled={disabled}>
        </Card>
    );
};

export default ClosedCard;