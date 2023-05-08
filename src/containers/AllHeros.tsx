import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CollectionView from '../components/Collection';
import { StackParamList } from '../types';
import { CardInterface } from '../types/collection_types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { buyCard } from '../redux/reducers/actions/collection_actions';

type AllHerosProps = NativeStackScreenProps<StackParamList, 'AllHeros'>;

const AllHeros: React.FC<AllHerosProps> = () => {
  const dispatch = useAppDispatch();
  const { discoveredCards } = useAppSelector(state => state.collection);

  const handleBuyCard = (card: CardInterface) => {
    dispatch(buyCard(card));
  };

  return (
    <CollectionView cards={discoveredCards} handleCardPress={handleBuyCard} />
  );
};

export default AllHeros;
