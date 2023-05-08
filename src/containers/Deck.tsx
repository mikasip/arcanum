import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardBase } from '../types/collection_types';
import CollectionView from '../components/Collection';
import { StackParamList } from '../types';
import { useAppSelector } from '../redux/hooks';
import { allCards } from '../constants/cards';

type DeckProps = NativeStackScreenProps<StackParamList, 'Deck'>;

const Deck: React.FC<DeckProps> = ({ navigation }) => {
  const ownedCards = useAppSelector(state => state.collection.ownedCards);

  const closedCard: CardBase = {
    image: require('../assets/general/background_card1.jpg'),
  };
  const cardBaseList = [...ownedCards, closedCard];
  const getCardAction = () => {
    navigation.navigate('CardSelection', { cards: allCards.slice(0, 5) });
  };

  return <CollectionView cards={cardBaseList} getCardAction={getCardAction} />;
};

export default Deck;
