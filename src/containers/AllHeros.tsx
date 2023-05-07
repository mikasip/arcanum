import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CollectionView from '../components/Collection';
import { StackParamList } from '../types';

type AllHerosProps = NativeStackScreenProps<StackParamList, 'AllHeros'>;

const AllHeros: React.FC<AllHerosProps> = ({ route }) => {
  const { heros } = route.params;

  return <CollectionView cards={heros} />;
};

export default AllHeros;
