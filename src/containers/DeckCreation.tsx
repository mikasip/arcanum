import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { StackParamList } from './Main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable, Platform, UIManager, LayoutAnimation } from 'react-native';
import OpenedCard from '../components/OpenedCard';
import { Button } from 'react-native-elements';
import { MissionInterface } from '../redux/reducers/types/mission_types';
import { COLORS } from '../constants/colors';
import SecondaryButton from '../components/styleComponents/SecondaryButton';
import PrimaryButton from '../components/styleComponents/PrimaryButton';

type DeckCreationProps = NativeStackScreenProps<StackParamList, "DeckCreation">

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const maxCards = 5

const DeckCreation: React.FC<DeckCreationProps> = ({ navigation, route }) => {
    const { heros, leader } = route.params
    const mission = route.params.mission
    const emptyItem = () =>
        <View style={{ flex: 1, borderRadius: 10, borderWidth: 1, borderColor: COLORS.white, borderStyle: 'dashed', aspectRatio: 2 / 3, }} />

    const [deckItems, setDeckItems] = useState<CardInterface[]>([]);

    const setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
                springDamping: 0.7,
            },
        });
    };
    const removeCard = (card: CardInterface) => {
        setAnimation();
        setDeckItems(deckItems.filter(item => item !== card))
    }

    const addCard = (card: CardInterface) => {
        if (deckItems.length >= maxCards) { console.log("Error message: Deck full."); return }
        if (deckItems.find(item => item == card)) { console.log("Error message: Card already in deck."); return }
        setDeckItems([...deckItems, card])
        setAnimation();
    }

    const cardElementList = () => {
        const numberOfEmptyItems = maxCards - deckItems.length
        const emptyItems = [...Array(numberOfEmptyItems)].map((_, idx) => <View key={idx} style={{ flex: 1, flexDirection: 'row' }}></View>)
        return ([deckItems.map((item, idx) =>
            <View key={item.id} style={{ flex: 1, flexDirection: 'row' }}>
                <OpenedCard card={item} onPress={() => { removeCard(item) }} disabled={false} />
            </View>), emptyItems])
    }

    const saveDeck = () => {
        console.log("deck saved!")
    }

    const enterBattle = (mission: MissionInterface) => {
        navigation.navigate("Battle", { ownCards: deckItems, ownLeader: leader, enemyCards: mission.enemies, enemyLeader: mission.leader })
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, gap: 10, backgroundColor: COLORS.background, borderBottomWidth: 1, borderColor: COLORS.white, padding: 10, justifyContent: 'center' }}>
                <Text style={{ flex: 1, color: COLORS.white, fontWeight: 'bold', fontSize: 12 }}>Select {maxCards} cards to deck:</Text>
                <View style={{ flex: 5, flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                    <View style={{ width: '100%', height: '100%', position: 'absolute', }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 3, position: 'relative', marginRight: 4, alignItems: 'center', }}>
                            {[...Array(maxCards)].map((_, idx) => <View key={idx} style={{ flex: 1, flexDirection: 'row', padding: 1 }}>{emptyItem()}</View>)}
                        </View>
                    </View>
                    {cardElementList()}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <SecondaryButton onPress={saveDeck} title={'Save deck'} transparent={true} />
                    {mission && <PrimaryButton onPress={() => { enterBattle(mission) }} title={'Enter battle'} transparent={true} />}
                </View>
            </View>
            <View style={{ flex: 6 }}><CollectionView cards={heros} handleCardPress={addCard} /></View>
        </View >
    );
};

export default DeckCreation;