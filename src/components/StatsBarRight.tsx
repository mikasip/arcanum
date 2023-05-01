import React from 'react';
import { Text, Image, View, ImageSourcePropType } from 'react-native';
import { COLORS } from '../constants/colors';
import { CardInterface } from '../redux/reducers/types/collection_types';

export const hpImage = require('../assets/general/blood_drop_nobg.png')
export const damageImage = require('../assets/general/sword1.png')
export const defenceImage = require('../assets/general/shield1.png')

interface StatsBarProps {
    card: CardInterface
    fontSize: number;
}

const StatsBarRight: React.FC<StatsBarProps> = ({ card, fontSize }) => {

    const statsItem = (img: ImageSourcePropType, text: string) =>
        <View style={{ width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={{ aspectRatio: 1, width: '70%' }}>
                <Image source={img} style={{ flex: 1, width: undefined, height: undefined }} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: fontSize, color: COLORS.white, marginRight: '5%' }}>{text}</Text>
        </View>

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            {statsItem(hpImage, card.hp.toString())}
            {statsItem(damageImage, card.attack.toString())}
        </View>
    );
};

export default StatsBarRight;