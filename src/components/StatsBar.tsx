import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ViewPropsIOS } from 'react-native';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colors';
import { CardInterface, Race } from '../redux/reducers/types/collection_types';
import Card from './Card'
import StatsBarRight from './StatsBarRight';

const fontSizeNameBase = 15
const fontSizeDescriptionBase = 12
const fontSizeRaceBase = 13
export const hpImage = require('../assets/general/blood_drop_nobg.png')
export const damageImage = require('../assets/general/sword1.png')
export const defenceImage = require('../assets/general/shield1.png')

export const humanLogo = require('../assets/general/elf_logo.png')
export const creatureLogo = require('../assets/general/elf_logo.png')
export const elfLogo = require('../assets/general/elf_logo.png')
export const fairyLogo = require('../assets/general/fairy_logo1.png')
export const ogreLogo = require('../assets/general/fairy_logo1.png')

const starsCount = 2
interface StatsBarProps {
    card: CardInterface
    fontSize: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ card, fontSize }) => {

    const getRaceImage = (race: Race) => {
        switch (race) {
            case "Human":
                return humanLogo
            case "Ogre":
                return ogreLogo
            case "Creature":
                return creatureLogo
            case "Fairy":
                return fairyLogo
            case "Elf":
                return elfLogo
            default:
                return humanLogo
        }
    }

    const starItem = (index: number) =>
        <View key={index} style={{ width: '20%', marginRight: '3%', aspectRatio: 1, alignSelf: 'center' }}>
            <Image source={require('../assets/general/star2.png')} style={{ flex: 1, width: undefined, height: undefined }} />
        </View>

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: '20%', aspectRatio: 1, alignSelf: 'center', marginRight: '3%' }}>
                    <Image source={getRaceImage(card.race)} style={{ flex: 1, width: undefined, height: undefined }} />
                </View>
                <Text style={{ fontSize: fontSize, fontWeight: 'bold', alignSelf: 'center', color: COLORS.white, marginRight: '3%' }}>{card.name}</Text>
                {[...Array(starsCount)].map((val, idx) => starItem(idx))}
            </View>
            <StatsBarRight card={card} fontSize={1.5 * fontSize} />
        </View>
    );
};

export default StatsBar;