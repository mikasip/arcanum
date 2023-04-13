import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ViewPropsIOS } from 'react-native';
import { Text, Image, StyleSheet, View, TouchableOpacity, ImageSourcePropType, ViewStyle } from 'react-native';
import { CardInterface, Race } from '../redux/reducers/types/collection_types';
import Card from './Card'

const fontSizeNameBase = 13
const fontSizeDescriptionBase = 10
const fontSizeRaceBase = 12
const hpImage = require('../assets/general/blood_drop_nobg.png')
const damageImage = require('../assets/general/sword1.png')
const defenceImage = require('../assets/general/shield1.png')

const humanLogo = require('../assets/general/elf_logo.png')
const creatureLogo = require('../assets/general/elf_logo.png')
const elfLogo = require('../assets/general/elf_logo.png')
const fairyLogo = require('../assets/general/fairy_logo1.png')
const ogreLogo = require('../assets/general/fairy_logo1.png')

interface OpenedCardProps {
    card: CardInterface
    width: string;
    margin: string;
    onPress: () => void;
    disabled: boolean;
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
    statsContainer: {
        position: 'absolute',
        top: 0,
        left: '65%',
        right: 0,
        marginTop: '3%',
        height: '4%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    stats: {
        flex: 1,
        color: 'white',
    },
    logo: {
        flex: 1,
        height: undefined,
        width: undefined,
        marginRight: '3%',
    },
    raceNameContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: '50%',
        marginTop: '3%',
        marginLeft: '3%',
        height: '4%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    logoContainer: {
        width: "10%",
        aspectRatio: 1,
        marginRight: '3%',
    },
    imageLogo: {
        flex: 1,
        width: undefined,
        height: undefined,
    }
});

const OpenedCard: React.FC<OpenedCardProps> = ({ card, width, margin, onPress, disabled }) => {

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
    return (
        <Card image={card.image} onPress={onPress} width={width} margin={margin} shadow={false} disabled={disabled}>
            <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                locations={[0.1, 1]}
                style={styles.gradient}
            />
            <View style={styles.statsContainer}>
                <Image source={hpImage} style={styles.logo} />
                <Text style={[styles.stats, { fontSize: fontSizeRace }]}>{card.hp}</Text>
                <Image source={damageImage} style={styles.logo} />
                <Text style={[styles.stats, { fontSize: fontSizeRace }]}>{card.attack}</Text>
                <Image source={defenceImage} style={styles.logo} />
                <Text style={[styles.stats, { fontSize: fontSizeRace }]}>{card.defence}</Text>
            </View>
            <View style={styles.raceNameContainer}>
                <View style={styles.logoContainer}>
                    <Image source={getRaceImage(card.race)} style={styles.imageLogo} />
                </View>
                <Text style={[styles.name, { fontSize: fontSizeName }]}>{card.name}</Text>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/general/star2.png')} style={styles.imageLogo} />
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/general/star2.png')} style={styles.imageLogo} />
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/general/star2.png')} style={styles.imageLogo} />
                </View>
            </View>
            <View style={styles.cardInfo} onLayout={handleLayout}>
                <Text style={[styles.race, { fontSize: fontSizeRace }]}>{card.race}</Text>
                <Text style={[styles.description, { fontSize: fontSizeDescription }]}>{card.description}</Text>
            </View>
        </Card>
    );
};

export default OpenedCard;