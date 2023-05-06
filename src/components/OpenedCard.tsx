import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';
import { CardInterface, Spell } from '../types/collection_types';
import Card from './Card';
import SpellView from './SpellView';
import StatsBar from './StatsBar';
import PrimaryButton from './styleComponents/PrimaryButton';

const fontSizeNameBase = 15;
const fontSizeRaceBase = 13;

interface OpenedCardProps {
  card: CardInterface;
  onPress?: () => void;
  disabled?: boolean;
  borderColor?: string;
  onAttack?: (card: CardInterface) => void;
  onSpell?: (card: CardInterface, spell: Spell) => void;
  damageTaken?: number;
  activeSpell?: Spell;
}

const styles = StyleSheet.create({
  imageCard: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    height: '30%',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: '2%',
    marginRight: '5%',
  },
  description: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'left',
    margin: '1.5%',
  },
  race: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '1.5%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20%',
  },
});

const OpenedCard: React.FC<OpenedCardProps> = ({
  card,
  onPress,
  disabled = true,
  borderColor = COLORS.black,
  onAttack,
  onSpell,
  damageTaken,
  activeSpell,
}) => {
  const [fontSizeName, setFontSizeName] = useState(0);
  const [fontSizeRace, setFontSizeRace] = useState(0);
  const hpTranslation = useSharedValue(0);

  hpTranslation.value = damageTaken ? -15 : 10;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(hpTranslation.value, { duration: 2000 }) },
      ],
    };
  });

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    const multiplier = width / 300;
    setFontSizeName(multiplier * fontSizeNameBase);
    setFontSizeRace(multiplier * fontSizeRaceBase);
  };
  return (
    <Card
      image={card.image}
      onPress={onPress}
      shadow={false}
      disabled={disabled}
      borderColor={borderColor}
    >
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
        locations={[0.1, 1]}
        style={styles.gradient}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '15%',
        }}
      >
        <StatsBar card={card} fontSize={fontSizeName} />
      </View>
      <View style={styles.cardInfo} onLayout={handleLayout}>
        <Text style={[styles.race, { fontSize: fontSizeRace }]}>
          {card.race}
        </Text>
        {card.spells.map((spell, idx) => (
          <View key={idx} style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => onSpell && onSpell(card, spell)}
              disabled={onSpell === undefined}
            >
              <SpellView
                spell={spell}
                active={activeSpell && activeSpell === spell}
              />
            </TouchableOpacity>
          </View>
        ))}
        {onAttack && (
          <PrimaryButton
            title="Attack"
            transparent
            onPress={() => {
              onAttack(card);
            }}
          />
        )}
      </View>
      {damageTaken && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 20,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
            },
            animatedStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: '900',
              color: damageTaken < 0 ? COLORS.damage : COLORS.heal,
            }}
          >
            {damageTaken}
          </Text>
        </Animated.View>
      )}
    </Card>
  );
};

export default OpenedCard;
