import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { CardItem } from '../types';
import { CardInterface } from '../types/collection_types';
import OpenedCard from './OpenedCard';

type CardRowProps = {
  cardItems: CardItem[];
  gap: number;
  onCardPress: (card: CardInterface) => void;
  getBorderColor?: (cardItem: CardItem) => string;
  containerWidth?: number;
};

const CardRow: React.FC<CardRowProps> = ({
  cardItems,
  gap,
  onCardPress,
  containerWidth,
  getBorderColor,
}) => {
  const dimensions = useWindowDimensions();

  const cardWidth = ((containerWidth || dimensions.width) - 6 * gap) / 5;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap,
      }}
    >
      {cardItems.map((item, _) => (
        <View style={{ width: cardWidth, height: '100%' }} key={item.card.id}>
          <OpenedCard
            card={item.card}
            onPress={() => {
              onCardPress(item.card);
            }}
            disabled={false}
            activeSpell={item.activeSpell}
            damageTaken={item.damage}
            borderColor={getBorderColor ? getBorderColor(item) : undefined}
          />
        </View>
      ))}
    </View>
  );
};

export default CardRow;
