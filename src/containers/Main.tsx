import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import CollectionView from '../components/Collection';
import BottomNavBar from '../components/BottomNavBar';
import TopBar from '../components/TopBar';

interface MainProps {
}

const Main: React.FC<MainProps> = ({ }) => {
    const { cards, deckHeros } = useSelector((state: RootState) => state.collection)
    const [activeTab, setActiveTab] = useState('Deck');

    function renderSwitch(param: string) {
        switch (param) {
            case 'Deck':
                return <CollectionView cards={deckHeros} ownDeck={true} />;
            case 'All cards':
                return <CollectionView cards={cards} ownDeck={false} />;
            case 'Mission':
                return <CollectionView cards={cards} ownDeck={false} />;
            default:
                return <CollectionView cards={deckHeros} ownDeck={false} />;;
        }
    }
    return (
        <View style={styles.container}>
            <TopBar title={activeTab}></TopBar>
            {renderSwitch(activeTab)}
            <View style={styles.bottomNavBarContainer} >
                <BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
    },
    bottomNavBarContainer: {
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Main;