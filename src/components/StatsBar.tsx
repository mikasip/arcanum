import React from 'react';
import { Text, Image, View } from 'react-native';
import {
  creatureLogo,
  elfLogo,
  fairyLogo,
  humanLogo,
  ogreLogo,
  star2,
} from '../assets';

import { COLORS } from '../constants/colors';
import { CardInterface, Race } from '../types/collection_types';
import StatsBarRight from './StatsBarRight';

const starsCount = 2;
interface StatsBarProps {
  card: CardInterface;
  fontSize: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ card, fontSize }) => {
  const getRaceImage = (race: Race) => {
    switch (race) {
      case 'Human':
        return humanLogo;
      case 'Ogre':
        return ogreLogo;
      case 'Creature':
        return creatureLogo;
      case 'Fairy':
        return fairyLogo;
      case 'Elf':
        return elfLogo;
      default:
        return humanLogo;
    }
  };

  const starItem = (index: number) => (
    <View
      key={index}
      style={{
        width: '20%',
        marginRight: '3%',
        aspectRatio: 1,
        alignSelf: 'center',
      }}
    >
      <Image
        source={star2}
        style={{ flex: 1, width: undefined, height: undefined }}
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '20%',
            aspectRatio: 1,
            alignSelf: 'center',
            marginRight: '3%',
          }}
        >
          <Image
            source={getRaceImage(card.race)}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </View>
        <Text
          style={{
            fontSize,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: COLORS.white,
            marginRight: '3%',
          }}
        >
          {card.name}
        </Text>
        {[...Array(starsCount)].map((val, idx) => starItem(idx))}
      </View>
      <StatsBarRight card={card} fontSize={1.5 * fontSize} />
    </View>
  );
};

export default StatsBar;
