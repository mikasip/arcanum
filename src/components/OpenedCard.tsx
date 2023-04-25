import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ViewPropsIOS } from 'react-native';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';
import { CardInterface, Race } from '../redux/reducers/types/collection_types';
import Card from './Card'
import StatsBar from './StatsBar';

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
        height: '15%',
    },
});

const OpenedCard: React.FC<OpenedCardProps> = ({ card, onPress, disabled = true }) => {

    const [fontSizeName, setFontSizeName] = useState(0);
    const [fontSizeDescription, setFontSizeDescription] = useState(0);
    const [fontSizeRace, setFontSizeRace] = useState(0);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        const multiplier = width / 300;
        setFontSizeName(multiplier * fontSizeNameBase);
        setFontSizeDescription(multiplier * fontSizeDescriptionBase);
        setFontSizeRace(multiplier * fontSizeRaceBase);
    };

    return (
        <Card image={card.image} onPress={onPress} shadow={false} disabled={disabled}>
            <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                locations={[0.1, 1]}
                style={styles.gradient}
            />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10%' }}><StatsBar card={card} fontSize={fontSizeName} /></View>
            <View style={styles.cardInfo} onLayout={handleLayout}>
                <Text style={[styles.race, { fontSize: fontSizeRace }]}>{card.race}</Text>
                <Text style={[styles.description, { fontSize: fontSizeDescription }]}>{card.description}</Text>
            </View>
        </Card>
    );
};

export default OpenedCard;