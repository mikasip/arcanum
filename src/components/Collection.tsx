import React from 'react';
import { FlatList, Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { CardInterface } from '../redux/reducers/types/collection_types';

interface CollectionProps {
    cards: CardInterface[];
    ownDeck: Boolean;
}

const numColumns = 3;
const itemMargin = 1;
const borderWidth = 2;
const containerPadding = 1; //percentage


const itemWidth = (100 - 2 * containerPadding - (numColumns + 1) * itemMargin) / numColumns //percentage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202020",
    },
    item: {
        width: itemWidth.toString() + '%',
        margin: itemMargin.toString() + '%',
        aspectRatio: 2 / 3,
        borderWidth: borderWidth,
        borderColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    cardInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'cover',
    },
    infoText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flex: 1,
    },
});

const CollectionView: React.FC<CollectionProps> = ({ cards }) => {
    const renderItem = ({ item, index }: { item: CardInterface, index: number }) => {
        return (
            <View style={styles.item}>
                <Image style={styles.image} source={item.image} />
                <View style={styles.cardInfo}>
                    <Text style={styles.infoText}> {item.name} </Text>
                </View>
                {index === cards.length - 1 && (
                    <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>

                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={{ padding: containerPadding.toString() + '%' }}
            />
        </View>
    );
};

export default CollectionView;