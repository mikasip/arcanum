import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface DraggableProps {
  children: JSX.Element;
}

type animationContext = {
  x: number;
  y: number;
};

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: animationContext) => {
      ctx.x = translationX.value;
      ctx.y = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.x + event.translationX;
      translationY.value = ctx.y + event.translationY;
    },
    onEnd: _ => {
      translationX.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.exp),
      });
      translationY.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.exp),
      });
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedStyle, { width: '100%', height: '100%' }]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Draggable;
