import React from 'react';
import { Text, Image, View, ImageSourcePropType } from 'react-native';
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
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 1, aspectRatio: 1, alignSelf: 'center' }}>
                <Image source={img} style={{ flex: 1, width: undefined, height: undefined }} />
            </View>
            <Text style={{ flex: 1, alignSelf: 'center', fontWeight: 'bold', fontSize: fontSize, color: 'white', marginRight: '5%' }}>{text}</Text>
        </View>

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
            {statsItem(hpImage, card.hp.toString())}
            {statsItem(damageImage, card.attack.toString())}
            {statsItem(defenceImage, card.defence.toString())}
        </View>
    );
};

export default StatsBarRight;