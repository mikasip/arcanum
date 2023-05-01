import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import { View, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { LinearGradient } from 'expo-linear-gradient';
import StatsBar from './StatsBar';
import StatsBarRight from './StatsBarRight';
import { COLORS } from '../constants/colors';
import SpellView from './SpellView';

type HeroInspectionProps = {
    hero: CardInterface
    children?: JSX.Element
}

const HeroInspection: React.FC<HeroInspectionProps> = ({ hero, children }) => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Image source={hero.image} style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} />
            <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                locations={[0.1, 1]}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}
            />

            <Text style={{ textAlign: 'center', fontSize: 30, color: COLORS.white, fontWeight: 'bold', top: 30, left: 0, right: 0, position: 'absolute' }}>
                {hero.name}
            </Text>
            <View style={{ position: 'absolute', left: 10, right: 10, bottom: 150, justifyContent: 'flex-end', flexDirection: 'column-reverse' }}>
                {hero.spells.map((spell, idx) => <View key={idx} style={{ flex: 1 }}><SpellView spell={spell} /></View>)}
            </View>
            {children}
        </View>
    );
};

export default HeroInspection;