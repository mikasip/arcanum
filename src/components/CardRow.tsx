import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import { View, useWindowDimensions } from 'react-native';
import OpenedCard from '../components/OpenedCard';
import { CardItem } from '../containers/Battle';

type CardRowProps = {
    cardItems: CardItem[]
    gap: number
    onCardPress: (card: CardInterface) => void;
    getBorderColor?: (cardItem: CardItem) => string;
    containerWidth?: number
}

const CardRow: React.FC<CardRowProps> = ({ cardItems, gap, onCardPress, containerWidth, getBorderColor }) => {

    const dimensions = useWindowDimensions();

    const cardWidth = ((containerWidth || dimensions.width) - 6 * gap) / 5

    const onItemLayout = (event: any, card: CardInterface) => {

    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, gap: gap }}>
            {cardItems.map((item, _) => <View style={{ width: cardWidth, height: '100%' }} key={item.card.id} onLayout={(event: any) => { onItemLayout(item.card, event) }} >
                <OpenedCard card={item.card} onPress={() => { onCardPress(item.card) }} disabled={false} borderColor={getBorderColor ? getBorderColor(item) : undefined} />
            </View>)}
        </View>
    );
};

export default CardRow;