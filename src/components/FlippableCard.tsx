import React, { useRef } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, Animated, ViewStyle, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlowingView from './GlowingView';
import Card from './Card';
import OpenedCard from './OpenedCard';
import { CardInterface } from '../redux/reducers/types/collection_types';
import ClosedCard from './ClosedCard';

interface FlippableCardProps {
    width?: string;
    margin?: string;
    disabled?: boolean;
    onPress?: () => void;
    shadow?: boolean;
    card: CardInterface,
}

const styles = StyleSheet.create({
    cardFront: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    cardBack: {
        backfaceVisibility: "hidden",
        width: '100%',
        height: '100%',
    },
});

const FlippableCard: React.FC<FlippableCardProps> = ({ width = '100%', margin = '0%', disabled = false, onPress, shadow = true, card }) => {

    const flipAnimation = useRef(new Animated.Value(0)).current;
    let flipRotation = 0;
    flipAnimation.addListener(({ value }) => flipRotation = value);
    const flipToFrontStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }
        ]
    };
    const flipToBackStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }
        ]
    }

    const flipToFront = () => {
        console.log("flipping to front")
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const flipToBack = () => {
        console.log("flipping to back")
        Animated.timing(flipAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Pressable style={{ width: width, margin: margin, aspectRatio: 2 / 3, }} onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>
            <Animated.View style={[styles.cardFront, flipToBackStyle]}>
                <OpenedCard card={card} />
            </Animated.View>
            <Animated.View style={[styles.cardBack, flipToFrontStyle]}>
                <ClosedCard shadow={false} />
            </Animated.View>
        </Pressable>
    );
};

export default FlippableCard;