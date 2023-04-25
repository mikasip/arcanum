import React, { useState, useRef } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { Animated, Modal, View, StyleSheet, TouchableOpacity, FlatList, LayoutChangeEvent } from 'react-native';
import ClosedCard from '../components/ClosedCard';
import { LayoutRectangle } from 'react-native';
import FlippableCard from '../components/FlippableCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Main';

type CardSelectionProps = NativeStackScreenProps<StackParamList, "CardSelection">

const numColumns = 3;
const numCards = 6;
const itemMargin = 1;
const containerPadding = 1; //percentage

const itemWidth = (100 - 2 * containerPadding - (numColumns + 1) * itemMargin) / numColumns //percentage


const styles = StyleSheet.create({
    cardSelectModalStyle: {
        backgroundColor: "#202020",
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    selectingButtonCard: {
        position: 'absolute',
        width: itemWidth + '%',
        aspectRatio: 2 / 3,
        bottom: itemMargin + '%',
        right: itemMargin + '%',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        width: '100%',
    },
    flexRow: {
        hidden: true,
        flexDirection: 'row',
        alignContent: 'space-between',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#202020",
    }
})

const CardSelection: React.FC<CardSelectionProps> = ({ navigation, route }) => {
    const heros = route.params.heros
    const [selectingCard, setSelectingCard] = useState(false);
    const [cardsHidden, setcardsHidden] = useState(true);

    const getSelectedCard = (card: CardInterface) => {
        console.log("Selecting the card " + card.name)
    }

    const animateCards = () => {
        transformAnimations.forEach((animation) => {
            animation();
        })
    }

    const getCardAction = () => {
        console.log("getting card")
        setSelectingCard(true);
        animateCards();
    }

    const positions: Animated.ValueXY[] = heros.map((hero) => {
        return (useRef(new Animated.ValueXY({ x: 0, y: 0 })).current);
    })
    const transformAnimations: (() => void)[] = Array.from({ length: heros.length }).map((val, i) => {
        const startAnimation = () => {
            Animated.timing(positions[i], {
                toValue: { x: 0, y: 0 },
                duration: 200,
                delay: i * 200,
                useNativeDriver: true,
            }).start();
        };
        return (startAnimation)
    });

    const selectionCardLayout: LayoutRectangle[] = []
    const updateCoordinates = (event: any, index: number) => {
        if (!selectingCard) {
            selectionCardLayout[index] = event.nativeEvent.layout;
        }
    }

    const updateTransformations = (event: LayoutChangeEvent) => {
        setcardsHidden(false);
        if (!selectingCard) {
            const { width, height } = event.nativeEvent.layout;

            for (let i = 0; i < selectionCardLayout.length; i++) {
                const translatedX = (width - selectionCardLayout[i].width * (1 - itemMargin) + selectionCardLayout[i].x)
                const translatedY = (height - selectionCardLayout[i].height * (1 - itemMargin) + selectionCardLayout[i].y)
                positions[i].setValue({ x: translatedX, y: translatedY })
            }
        }
    }

    const selectionCards = heros.map((item, index) => {
        return (
            <Animated.View key={index} style={{ width: itemWidth + '%', margin: itemMargin + '%', transform: positions[index].getTranslateTransform() }} onLayout={(event: any) => updateCoordinates(event, index)}>
                <FlippableCard width={100 + '%'} margin={0 + '%'} onPress={() => getSelectedCard(item)} disabled={false} shadow={false} card={item} />
            </Animated.View>);
    })

    return (
        <View style={styles.cardSelectModalStyle} onLayout={updateTransformations}>
            <View style={styles.selectingButtonCard}>
                <ClosedCard disabled={true} shadow={false}></ClosedCard>
            </View>
            <View style={styles.flexRow}>
                {selectionCards.slice(0, 3)}
            </View>
            <View style={styles.flexRow}>
                {selectionCards.slice(3, 6)}
            </View>
            <TouchableOpacity style={[styles.selectingButtonCard, { opacity: 1 }]} onPress={getCardAction} disabled={selectingCard} />
            {cardsHidden && (
                <View style={styles.overlay} />
            )}
        </View>
    );
};

export default CardSelection;