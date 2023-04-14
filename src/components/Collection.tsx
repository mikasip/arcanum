import React, { useRef, useState } from 'react';
import { Animated, Modal, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { FlatList, Text, Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { CardInterface, CardBase } from '../redux/reducers/types/collection_types';
import ClosedCard from './ClosedCard';
import OpenedCard from './OpenedCard';

interface CollectionProps {
    cards: CardBase[];
    getCardAction?: () => void;
}

const numColumns = 3;
const itemMargin = 1;
const containerPadding = 1; //percentage

const itemWidth = (100 - 2 * containerPadding - (numColumns + 1) * itemMargin) / numColumns //percentage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020",
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

const CollectionView: React.FC<CollectionProps> = ({ cards, getCardAction }) => {

    const [selectedCard, setSelectedCard] = useState<CardInterface | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [modalWidth, setWidth] = useState(0);
    const [modalHeight, setHeight] = useState(0);
    const [modalMarginHorizontal, setMarginHorizontal] = useState(0);
    const [modalMaginVertical, setMarginVertical] = useState(0);

    const handleLayout = (event: any) => {
        const { width, height } = event.nativeEvent.layout;
        var modalWidth = 0.8 * width;
        var modalHeight = 3 * modalWidth / 2;
        if (modalHeight > 0.9 * height) {
            modalHeight = 0.9 * height
            modalWidth = 2 * modalHeight / 3;
        }
        setWidth(modalWidth);
        setHeight(modalHeight);
        setMarginHorizontal((width - modalWidth) / 2);
        setMarginVertical((height - modalHeight) / 2);
    };

    const handeOpenedCardPress = (card: CardInterface) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const renderItem = ({ item, index }: { item: CardBase, index: number }) => {
        const getItem = ({ item }: { item: CardBase }) => {
            if (item.card) {
                return (
                    <View style={{ width: itemWidth + '%', margin: itemMargin + '%' }}>
                        <OpenedCard card={item.card} width={100 + '%'} margin={0 + '%'} onPress={() => handeOpenedCardPress(item.card!)} disabled={modalVisible} />
                    </View>
                );
            } else {
                return (
                    <ClosedCard width={itemWidth + '%'} margin={itemMargin + '%'} disabled={modalVisible} onPress={getCardAction} />
                );
            }
        }
        return (
            <>{getItem({ item })}</>
        );
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
            <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => { setModalVisible(false) }}>
                <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                    <View style={styles.modalOverlay} onLayout={handleLayout} />
                </TouchableWithoutFeedback>
                <View style={{ width: modalWidth, height: modalHeight, marginLeft: modalMarginHorizontal, marginTop: modalMaginVertical }}>
                    <OpenedCard card={selectedCard!} width={100 + '%'} margin={0 + '%'} onPress={() => handeOpenedCardPress(selectedCard!)} disabled={true} />
                </View>
            </Modal>
        </View>
    );
};

export default CollectionView;