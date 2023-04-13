import React, { useRef } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Animated, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlowingView from './GlowingView';
import Card from './Card';

interface ClosedCardProps {
    image: ImageSourcePropType
    width: string;
    margin: string;
    disabled: boolean;
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'cover',
    },
    plusSign: {
        margin: '30%',
        width: '40%',
        height: '40%',
        resizeMode: 'cover',
        position: 'absolute'
    },
    plusSignContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

const ClosedCard: React.FC<ClosedCardProps> = ({ image, width, margin, disabled = false }) => {

    const onPress = () => { console.log("Pressed closed card!") }

    return (
        <Card image={image} onPress={onPress} width={width} margin={margin} shadow={true} disabled={disabled}>
        </Card>
    );
};

export default ClosedCard;