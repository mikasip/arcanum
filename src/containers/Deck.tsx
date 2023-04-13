import React from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';

interface DeckProps {
    heros: CardBase[]
}

const Deck: React.FC<DeckProps> = ({ heros }) => {

    const closedCard: CardBase = { image: require('../assets/general/background_card1.jpg') }
    const cardBaseList = [...heros, closedCard]
    console.log(cardBaseList.length)
    console.log(heros.length)

    return (
        <CollectionView cards={cardBaseList} />
    );
};

export default Deck;