import React, { useState, useEffect } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

interface Props {
    borderRadius?: number;
    color?: string;
    duration?: number;
    borderWidth?: number;
    margin?: number;
    children: React.ReactNode;
}

const GlowingBorder: React.FC<Props> = ({
    borderRadius = 2,
    color = 'blue',
    duration = 1000,
    borderWidth = 2,
    margin = 5,
    children,
}) => {
    const [animation] = useState(new Animated.Value(0));

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

    const borderStyle: Animated.AnimatedProps<ViewStyle> = {
        position: 'absolute',
        top: -borderWidth,
        left: -borderWidth,
        bottom: -borderWidth,
        right: -borderWidth,
        borderRadius: borderRadius,
        margin: margin,
        borderColor: color,
        borderWidth,
        opacity,
    };

    return (
        <View style={{ position: 'relative', flex: 1 }}>
            {children}
            <Animated.View style={borderStyle} />
        </View>
    );
};

export default GlowingBorder;