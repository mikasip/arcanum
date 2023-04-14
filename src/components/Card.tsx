import React, { useEffect, useRef, useState } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, ViewStyle, Animated } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
    image: ImageSourcePropType
    children?: React.ReactNode
    onPress?: () => void;
    width: string;
    margin: string;
    shadow: boolean;
    disabled: boolean;
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'cover',
        backgroundColor: 'black',
    },
    card: {
        aspectRatio: 2 / 3,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    button: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flex: 1,
    },
});

const Card: React.FC<CardProps> = ({ image, children, onPress, width, margin, disabled = false, shadow = false }) => {

    const cardStyles: Animated.AnimatedProps<ViewStyle>[] = [styles.card, { width: width, margin: margin }];
    if (shadow) {
        const [animation] = useState(new Animated.Value(0));
        const duration = 2000;
        useEffect(() => {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: duration / 2,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: duration / 2,
                        useNativeDriver: true,
                    }),
                ])
            );

            loop.start();

            return () => loop.stop();
        }, [animation, duration]);

        const opacity = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        });

        const shadowStyle: Animated.AnimatedProps<ViewStyle> = {
            opacity: opacity,
        };
        cardStyles.push(shadowStyle);
    }

    return (
        <Animated.View style={cardStyles}>
            <Image style={styles.image} source={image} />
            {children}
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled} />
        </Animated.View>
    );
};

export default Card;