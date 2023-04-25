import React from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Main';
import { View, Text } from 'react-native';

type BattleProps = NativeStackScreenProps<StackParamList, "Battle">

const AllHeros: React.FC<BattleProps> = ({ navigation, route }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center' }}>Battle</Text>
        </View>
    );
};

export default AllHeros;