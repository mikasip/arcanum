import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { ViewPropsIOS } from 'react-native';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import { COLORS } from '../constants/colors';
import { CardInterface, Race, Spell } from '../redux/reducers/types/collection_types';
import Card from './Card';
import SpellView from './SpellView';
import StatsBar from './StatsBar';
import PrimaryButton from './styleComponents/PrimaryButton';

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

interface OpenedCardProps {
    card: CardInterface
    onPress?: () => void;
    disabled?: boolean;
    borderColor?: string;
    onAttack?: (card: CardInterface) => void;
    onSpell?: (card: CardInterface, spell: Spell) => void;
    damageTaken?: number,
    activeSpell?: Spell,
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
        margin: '1.5%'
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20%',
    },
});

const OpenedCard: React.FC<OpenedCardProps> = ({ card, onPress, disabled = true, borderColor = COLORS.black, onAttack, onSpell, damageTaken, activeSpell }) => {

    const [fontSizeName, setFontSizeName] = useState(0);
    const [fontSizeDescription, setFontSizeDescription] = useState(0);
    const [fontSizeRace, setFontSizeRace] = useState(0);
    const hpTranslation = useSharedValue(0);

    hpTranslation.value = damageTaken ? -15 : 10

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(hpTranslation.value, { duration: 2000 }) }],
        };
    });

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        const multiplier = width / 300;
        setFontSizeName(multiplier * fontSizeNameBase);
        setFontSizeDescription(multiplier * fontSizeDescriptionBase);
        setFontSizeRace(multiplier * fontSizeRaceBase);
    };
    return (
        <Card image={card.image} onPress={onPress} shadow={false} disabled={disabled} borderColor={borderColor}>
            <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                locations={[0.1, 1]}
                style={styles.gradient}
            />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}><StatsBar card={card} fontSize={fontSizeName} /></View>
            <View style={styles.cardInfo} onLayout={handleLayout}>
                <Text style={[styles.race, { fontSize: fontSizeRace }]}>{card.race}</Text>
                {card.spells.map((spell, idx) => <View key={idx} style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => { onSpell && onSpell(card, spell) }} disabled={onSpell == undefined}>
                        <SpellView spell={spell} active={activeSpell && activeSpell == spell} />
                    </TouchableOpacity>
                </View>)}
                {onAttack &&
                    <PrimaryButton title={"Attack"} transparent={true} onPress={() => { onAttack(card) }} />}
            </View>
            {damageTaken && <Animated.View style={[{ position: 'absolute', top: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }, animatedStyle]}>
                <Text style={{ fontSize: 25, fontWeight: '900', color: damageTaken < 0 ? COLORS.damage : COLORS.heal }}>
                    {damageTaken}
                </Text>
            </Animated.View>}
        </Card>
    );
};

export default OpenedCard;