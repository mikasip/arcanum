import React, { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

export type ImageViewerProps = {
  image: ImageSourcePropType;
  width: number;
  height: number;
  containerWidth: number;
  containerHeight: number;
  onSingleTap?: (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => unknown;
  children?: JSX.Element[];
  onImageLayout?: (event: any) => void;
};

export default function ImageViewer({
  image,
  width,
  height,
  containerWidth,
  containerHeight,
  onSingleTap,
  children,
  onImageLayout,
}: ImageViewerProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateY = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const translateX = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);

  const MAX_ZOOM_SCALE = 3;

  const { width: finalWidth, height: finalHeight } = useMemo(() => {
    function ruleOfThree(
      firstValue: number,
      firstResult: number,
      secondValue: number,
    ) {
      const secondResult = (firstResult * secondValue) / firstValue;

      return secondResult;
    }

    const resizedBasedOnWidth = {
      width: containerWidth,
      height: ruleOfThree(width, containerWidth, height),
    };

    const resizedBasedOnHeight = {
      width: ruleOfThree(height, containerHeight, width),
      height: containerHeight,
    };

    if (width === height) {
      const largestContainerDimension = Math.max(
        containerWidth,
        containerHeight,
      );

      return {
        width: largestContainerDimension,
        height: largestContainerDimension,
      };
    }
    if (resizedBasedOnHeight.width > containerWidth) {
      return resizedBasedOnHeight;
    }
    return resizedBasedOnWidth;
  }, [width, height, containerWidth, containerHeight]);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate(event => {
      const newScale = savedScale.value * event.scale;
      if (newScale >= 1 && newScale <= MAX_ZOOM_SCALE) {
        scale.value = newScale;
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate(event => {
      if (scale.value < 1) {
        return;
      }

      const realImageWidth = finalWidth * scale.value;

      const maxTranslateX =
        realImageWidth <= containerWidth
          ? 0
          : (realImageWidth - containerWidth) / 2;
      const minTranslateX =
        realImageWidth <= containerWidth
          ? 0
          : -(realImageWidth - containerWidth) / 2;

      const possibleNewTranslateX = savedTranslateX.value + event.translationX;

      if (possibleNewTranslateX > maxTranslateX) {
        translateX.value = maxTranslateX;
      } else if (possibleNewTranslateX < minTranslateX) {
        translateX.value = minTranslateX;
      } else {
        translateX.value = possibleNewTranslateX;
      }

      const realImageHeight = finalHeight * scale.value;

      const maxTranslateY =
        realImageHeight <= containerHeight
          ? 0
          : (realImageHeight - containerHeight) / 2;
      const minTranslateY =
        realImageHeight <= containerHeight
          ? 0
          : -(realImageHeight - containerHeight) / 2;

      const possibleNewTranslateY = savedTranslateY.value + event.translationY;

      if (possibleNewTranslateY > maxTranslateY) {
        translateY.value = maxTranslateY;
      } else if (possibleNewTranslateY < minTranslateY) {
        translateY.value = minTranslateY;
      } else {
        translateY.value = possibleNewTranslateY;
      }
    })
    .onEnd(event => {
      const realImageWidth = finalWidth * scale.value;

      const maxTranslateX =
        realImageWidth <= containerWidth
          ? 0
          : (realImageWidth - containerWidth) / 2;
      const minTranslateX =
        realImageWidth <= containerWidth
          ? 0
          : -(realImageWidth - containerWidth) / 2;

      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [minTranslateX, maxTranslateX],
      });

      const realImageHeight = finalHeight * scale.value;

      const maxTranslateY =
        realImageHeight <= containerHeight
          ? 0
          : (realImageHeight - containerHeight) / 2;
      const minTranslateY =
        realImageHeight <= containerHeight
          ? 0
          : -(realImageHeight - containerHeight) / 2;

      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [minTranslateY, maxTranslateY],
      });
    });

  const singleTap = Gesture.Tap().onEnd(event => {
    const overflowX = finalWidth * scale.value - containerWidth;
    const overflowY = finalHeight * scale.value - containerHeight;
    const absoluteTranslateX = translateX.value - overflowX / 2;
    const absoluteTranslateY = translateY.value - overflowY / 2;
    const tapX = event.x - absoluteTranslateX;
    const tapY = event.y - absoluteTranslateY;
    const scaledTapX = tapX / scale.value;
    const scaledTapY = tapY / scale.value;
    if (onSingleTap)
      runOnJS(onSingleTap)(scaledTapX, scaledTapY, finalWidth, finalHeight);
  });

  const imageContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  const composedGestures = Gesture.Simultaneous(pinchGesture, panGesture);
  const allGestures = Gesture.Exclusive(composedGestures, singleTap);

  return (
    <GestureDetector gesture={allGestures}>
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
      >
        <Animated.View style={imageContainerAnimatedStyle}>
          <Animated.View
            style={[
              imageAnimatedStyle,
              { width: finalWidth, height: finalHeight },
            ]}
          >
            <Animated.Image
              style={{ flex: 1, width: undefined, height: undefined }}
              source={image}
              onLayout={onImageLayout}
            />
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
