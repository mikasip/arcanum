import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardInterface } from '../types/collection_types';
import ImageViewer from '../components/ImageViewer';
import { MissionInterface } from '../types/mission_types';
import CardModalPopup from '../components/CardModalPopup';
import { COLORS } from '../constants/colors';
import SecondaryButton from '../components/styleComponents/SecondaryButton';
import PrimaryButton from '../components/styleComponents/PrimaryButton';
import CardRow from '../components/CardRow';
import { StackParamList } from '../types';

type MissionsProps = NativeStackScreenProps<StackParamList, 'Missions'>;

const Missions: React.FC<MissionsProps> = ({ navigation, route }) => {
  const { map } = route.params;
  const { heros, leader } = route.params;
  const dimensions = useWindowDimensions();

  const [containerHeight, setContainerHeight] = useState(dimensions.height);
  const [containerWidth, setContainerWidth] = useState<number>(
    dimensions.width,
  );
  const [activeMission, setActiveMission] = useState<
    MissionInterface | undefined
  >(undefined);
  const [activeCard, setActiveCard] = useState<CardInterface | undefined>(
    undefined,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const offset = useSharedValue(-0.5 * containerHeight);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset.value) }],
    };
  });

  const updateContainerDimension = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  };

  const onPress = (tapX: number, tapY: number, width: number) => {
    const trueScale = width / map.originalWidth;
    const trueX = tapX / trueScale;
    const trueY = tapY / trueScale;
    const tappedMission = map.missions.find(
      mission =>
        Math.sqrt((trueX - mission.x) ** 2 + (trueY - mission.y) ** 2) <
        mission.radius,
    );
    if (tappedMission) {
      setActiveMission(tappedMission);
      offset.value = 0;
      lockIconScale.value = withTiming(1, { duration: 600 });
    } else {
      setActiveMission(undefined);
      modalClose();
    }
  };

  const [imageWidth, setImageWidth] = useState(dimensions.width);
  const onImageLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setImageWidth(width);
  };

  const modalClose = () => {
    offset.value = withTiming(-0.5 * containerHeight, { duration: 500 });
    lockIconScale.value = lockIconScaleAnimation;
  };

  const lockIconScale = useSharedValue(1);
  const lockIconScaleAnimation = withRepeat(
    withTiming(1.15, { duration: 600, easing: Easing.ease }),
    -1,
    true,
    () => {},
  );
  lockIconScale.value = lockIconScaleAnimation;
  const lockAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: lockIconScale.value }],
    };
  });

  const lockImage = require('../assets/general/lock.png');
  const doorImage = require('../assets/general/lock.png');
  const lockImages = map.missions.map((mission, idx) => {
    const scale = imageWidth / map.originalWidth;
    return (
      <Animated.Image
        key={idx}
        source={mission.locked ? lockImage : doorImage}
        style={[
          {
            position: 'absolute',
            left: scale * mission.x - 25,
            top: scale * mission.y - 25,
            width: 50,
            height: 50,
          },
          lockAnimatedStyle,
        ]}
      />
    );
  });

  const enterDeckCreation = (mission: MissionInterface) => {
    navigation.navigate('DeckCreation', {
      heros,
      mission,
      leader,
    });
  };

  return (
    <View
      style={{ width: '100%', height: '100%', flex: 1 }}
      onLayout={updateContainerDimension}
    >
      <ImageViewer
        image={map.image}
        height={map.originalHeight}
        width={map.originalWidth}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        onSingleTap={onPress}
        onImageLayout={onImageLayout}
      >
        {lockImages}
      </ImageViewer>
      {activeMission && (
        <Animated.View style={[styles.missionPrompt, animatedStyles]}>
          <View
            style={{
              margin: '3%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.white,
                alignSelf: 'center',
                alignContent: 'center',
              }}
            >
              {activeMission.name}
            </Text>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardRow
                cardItems={activeMission.enemies.map(card => {
                  return { card, active: false };
                })}
                gap={10}
                onCardPress={(card: CardInterface) => {
                  setActiveCard(card);
                  setModalVisible(true);
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <SecondaryButton title="Close" onPress={modalClose} transparent />
              <PrimaryButton
                title="Challenge"
                onPress={() => {
                  enterDeckCreation(activeMission);
                }}
                transparent
              />
            </View>
          </View>
        </Animated.View>
      )}
      <CardModalPopup
        card={activeCard}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setActiveCard(undefined);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  missionPrompt: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: COLORS.background,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: COLORS.white,
  },
});

export default Missions;
