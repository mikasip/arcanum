import React, { useRef, useState } from 'react';
import { Animated, Modal, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { FlatList, Text, Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import CardModalPopup from './CardModalPopup';
import ClosedCard from './ClosedCard';
import OpenedCard from './OpenedCard';
import { COLORS } from '../constants/colors';

interface CollectionProps {
    cards: (CardBase | CardInterface)[];
    getCardAction?: () => void;
    handleCardPress?: (card: CardInterface) => void;
}

const numColumns = 3;
const itemMargin = 1;
const containerPadding = 1; //percentage

const itemWidth = (100 - 2 * containerPadding - (numColumns + 1) * itemMargin) / numColumns //percentage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});

const CollectionView: React.FC<CollectionProps> = ({ cards, getCardAction, handleCardPress }) => {

    const [selectedCard, setSelectedCard] = useState<CardInterface | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    const handeOpenedCardPress = (card: CardInterface) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const numRows = Math.ceil((cards.length + 1) / 3)
    const renderItem = ({ item, index }: { item: CardBase | CardInterface, index: number }) => {
        if (item as CardInterface) {
            return (
                <View style={{ width: itemWidth + '%', margin: itemMargin + '%', aspectRatio: 2 / 3 }}>
                    <OpenedCard card={item as CardInterface} onPress={() => { handleCardPress ? handleCardPress(item as CardInterface) : handeOpenedCardPress(item as CardInterface) }} disabled={modalVisible} />
                </View>
            );
        } else {
            return (
                <View style={{ width: itemWidth + '%', margin: itemMargin + '%', aspectRatio: 2 / 3 }}>
                    <ClosedCard disabled={modalVisible} onPress={getCardAction} />
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={{ padding: containerPadding.toString() + '%' }}
            />
            <CardModalPopup card={selectedCard} visible={modalVisible} onClose={() => { setModalVisible(false); setSelectedCard(undefined); }} />
        </View>
    );
};

export default CollectionView;