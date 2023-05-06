import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CardInterface } from '../types/collection_types';
import HeroInspection from '../components/HeroInspection';
import PrimaryButton from '../components/styleComponents/PrimaryButton';

type LeaderCreationProps = {
  leaders: CardInterface[];
  onCreate: (leaderId: string) => void;
};

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const LeaderCreation: React.FC<LeaderCreationProps> = ({
  leaders,
  onCreate,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={leaders}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <HeroInspection hero={item}>
            <View style={{ position: 'absolute', bottom: 20, right: 30 }}>
              <PrimaryButton
                title="Select Leader"
                onPress={() => {
                  onCreate(item.id);
                }}
                transparent={false}
              />
            </View>
          </HeroInspection>
        )}
      />
    </View>
  );
};

export default LeaderCreation;
