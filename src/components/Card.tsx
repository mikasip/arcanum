import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
  Animated,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface CardProps {
  image: ImageSourcePropType;
  children?: React.ReactNode;
  onPress?: () => void;
  shadow: boolean;
  disabled: boolean;
  borderColor?: string;
}

const aspectRatio = 2 / 3;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  card: {
    aspectRatio,
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

const Card: React.FC<CardProps> = ({
  image,
  children,
  onPress,
  disabled = false,
  shadow = false,
  borderColor = COLORS.black,
}) => {
  const [scaleByWidth, setScaleByWidth] = useState(true);
  const dimensionStyle = scaleByWidth
    ? { width: '100%', height: undefined }
    : { height: '100%', width: undefined };
  const cardStyles: Animated.AnimatedProps<ViewStyle>[] = [styles.card];

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
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [animation, duration]);

  if (shadow) {
    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    const shadowStyle: Animated.AnimatedProps<ViewStyle> = {
      opacity,
    };
    cardStyles.push(shadowStyle);
  }

  const calculateImageDimensions = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > (2 / 3) * height) {
      setScaleByWidth(false);
    } else {
      setScaleByWidth(true);
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}
      onLayout={calculateImageDimensions}
    >
      <Animated.View style={[cardStyles, dimensionStyle, { borderColor }]}>
        <Image style={styles.image} source={image} />
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          disabled={disabled}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Card;
