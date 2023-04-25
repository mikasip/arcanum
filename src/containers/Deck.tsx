import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { Modal, View, StyleSheet } from 'react-native';
import CardSelection from './CardSelection';
import { DeckStackParamList } from './Main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type DeckProps = NativeStackScreenProps<DeckStackParamList, "Deck">

const Deck: React.FC<DeckProps> = ({ navigation, route }) => {
    const heros = route.params.heros

    const closedCard: CardBase = { image: require('../assets/general/background_card1.jpg') }
    const cardBaseList = [...heros, closedCard]
    console.log(navigation)
    const getCardAction = () => {
        navigation.navigate('CardSelection', { heros: [] })
    }

    return (
        <>
            <CollectionView cards={cardBaseList} getCardAction={getCardAction} />

        </>
    );
};

export default Deck;