import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardBase } from '../types/collection_types';
import CollectionView from '../components/Collection';
import { StackParamList } from '../types';

type DeckProps = NativeStackScreenProps<StackParamList, 'Deck'>;

const Deck: React.FC<DeckProps> = ({ navigation, route }) => {
  const { heros } = route.params;

  const closedCard: CardBase = {
    image: require('../assets/general/background_card1.jpg'),
  };
  const cardBaseList = [...heros, closedCard];
  const getCardAction = () => {
    navigation.navigate('CardSelection', { heros: heros.slice(0, 6) });
  };

  return <CollectionView cards={cardBaseList} getCardAction={getCardAction} />;
};

export default Deck;
