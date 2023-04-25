import React, { useState } from 'react';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CollectionView from '../components/Collection';
import { StackParamList } from './Main';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable, Platform, UIManager, LayoutAnimation } from 'react-native';
import OpenedCard from '../components/OpenedCard';
import { Button } from 'react-native-elements';
import { MissionInterface } from '../redux/reducers/types/mission_types';

type DeckCreationProps = NativeStackScreenProps<StackParamList, "DeckCreation">

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const maxCards = 5

const DeckCreation: React.FC<DeckCreationProps> = ({ navigation, route }) => {
    const heros = route.params.heros
    const mission = route.params.mission
    const emptyItem = () =>
        <View style={{ flex: 1, borderRadius: 10, borderWidth: 1, borderColor: 'white', borderStyle: 'dashed', aspectRatio: 2 / 3, }} />

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
        navigation.navigate("Battle", { mission: mission })
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, gap: 10, backgroundColor: '#202020', borderBottomWidth: 1, borderColor: 'white', padding: 10 }}>
                <Text style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: 12 }}>Select {maxCards} cards to deck:</Text>
                <View style={{ flex: 6, flexDirection: 'row', gap: 3 }}>
                    <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 3, position: 'relative', marginRight: 4 }}>
                            {[...Array(maxCards)].map((_, idx) => <View key={idx} style={{ flex: 1, flexDirection: 'row', padding: 1 }}>{emptyItem()}</View>)}
                        </View>
                    </View>
                    {cardElementList()}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>
                    <Pressable style={{ flex: 1, backgroundColor: 'transparent' }} onPress={saveDeck} ><Text style={{ flex: 1, color: 'white', alignSelf: 'center' }}>Save deck</Text></Pressable>
                    {mission && <Pressable style={{ flex: 1, backgroundColor: 'transparent' }} onPress={() => { enterBattle(mission) }} ><Text style={{ flex: 1, color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Enter battle</Text></Pressable>}
                </View>
            </View>
            <View style={{ flex: 6 }}><CollectionView cards={heros} handleCardPress={addCard} /></View>
        </View >
    );
};

export default DeckCreation;