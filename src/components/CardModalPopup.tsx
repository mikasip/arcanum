import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { CardInterface, Spell } from '../redux/reducers/types/collection_types';
import OpenedCard from './OpenedCard';
import { COLORS } from '../constants/colors';

interface CardModalPopupProps {
    card?: CardInterface;
    visible: boolean;
    onClose: () => void;
    onAttack?: (card: CardInterface) => void;
    onSpell?: (card: CardInterface, spell: Spell) => void;
}


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

const CardModalPopup: React.FC<CardModalPopupProps> = ({ card, visible, onClose, onAttack, onSpell }) => {

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

    return (
        <Modal visible={visible} animationType="none" transparent={true} onRequestClose={() => { onClose(); }}>
            <TouchableWithoutFeedback onPress={() => { onClose() }}>
                <View style={styles.modalOverlay} onLayout={handleLayout} />
            </TouchableWithoutFeedback>
            <View style={{ width: modalWidth, height: modalHeight, marginLeft: modalMarginHorizontal, marginTop: modalMaginVertical }}>
                {card && <OpenedCard card={card} disabled={true} onAttack={onAttack} onSpell={onSpell} />}
            </View>
        </Modal>
    );
};

export default CardModalPopup;