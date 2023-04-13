import React from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';

interface AllHerosProps {
    heros: CardBase[]
}

const AllHeros: React.FC<AllHerosProps> = ({ heros }) => {

    return (
        <CollectionView cards={heros} />
    );
};

export default AllHeros;