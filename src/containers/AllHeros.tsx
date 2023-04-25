import React from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Main';

type AllHerosProps = NativeStackScreenProps<StackParamList, "AllHeros">

const AllHeros: React.FC<AllHerosProps> = ({ navigation, route }) => {
    const heros = route.params.heros

    return (
        <CollectionView cards={heros} />
    );
};

export default AllHeros;