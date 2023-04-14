import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { Modal, View, StyleSheet } from 'react-native';
import CardSelection from './CardSelection';

interface DeckProps {
    heros: CardBase[]
}

const styles = StyleSheet.create({
    cardSelectModalStyle: {
        flex: 1,

    }
})

const Deck: React.FC<DeckProps> = ({ heros }) => {
    const [cardSelectModalVisible, setCardSelectModalVisible] = useState(false);

    const closedCard: CardBase = { image: require('../assets/general/background_card1.jpg') }
    const cardBaseList = [...heros, closedCard]

    const getCardAction = () => {
        setCardSelectModalVisible(true);
    }

    return (
        <>
            <CollectionView cards={cardBaseList} getCardAction={getCardAction} />
            <Modal visible={cardSelectModalVisible} transparent={true} onRequestClose={() => { setCardSelectModalVisible(false) }}>
                <CardSelection heros={heros.map((hero) => hero.card!).slice(0, 6)} />
            </Modal>
        </>
    );
};

export default Deck;