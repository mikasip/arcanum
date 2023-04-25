import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, PanResponder, PanResponderInstance, GestureResponderEvent, ViewStyle, ImageSourcePropType } from 'react-native';
import Animated, {
    useSharedValue,
    withDecay,
    useAnimatedStyle,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface Props {
    image: ImageSourcePropType;
    imageWidth: number;
    imageHeight: number;
    initialTranslateX: number;
    initialTranslateY: number;
}

const ImageWithZoomAndPan: React.FC<Props> = ({ image, imageWidth, imageHeight, initialTranslateX, initialTranslateY }) => {

    const [maxTranslateX, setMaxTranslateX] = useState<number>(0);
    const [maxTranslateY, setMaxTranslateY] = useState<number>(0);

    const x = useSharedValue(initialTranslateX);
    const y = useSharedValue(initialTranslateY);

    type AnimatedGHContext = {
        startX: number;
        startY: number;
    };

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        AnimatedGHContext
    >({
        onStart: (event, context) => {
            context.startX = x.value;
            context.startY = y.value;
        },
        onActive: (event, context) => {
            let newX = context.startX + event.translationX;
            let newY = context.startY + event.translationY;
            if (newX > 0) newX = 0
            else if (newX < maxTranslateX) newX = maxTranslateX
            if (newY > 0) newY = 0
            else if (newY < maxTranslateY) newY = maxTranslateY
            x.value = newX;
            y.value = newY;
        },
        onEnd: (evt) => {
            x.value = withDecay({
                velocity: evt.velocityX,
                deceleration: 0.996,
                clamp: [maxTranslateX, 0], // optionally define boundaries for the animation
            });
            y.value = withDecay({
                velocity: evt.velocityY,
                deceleration: 0.996,
                clamp: [maxTranslateY, 0]
            })
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: x.value,
                },
                {
                    translateY: y.value,
                }
            ],
        };
    });

    const handleLayout = (event: any) => {
        const { width, height } = event.nativeEvent.layout;
        setMaxTranslateX(-(imageWidth - width));
        setMaxTranslateY(-(imageHeight - height));
    };

    return (
        <View style={styles.container} onLayout={handleLayout}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[{ width: imageWidth, height: imageHeight }, animatedStyle]} >
                    <Image
                        style={[styles.image]}
                        source={image}
                        resizeMode={'cover'}
                    />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
});

export default ImageWithZoomAndPan;