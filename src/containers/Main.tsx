import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Button, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CollectionView from '../components/Collection';
import BottomNavBar from '../components/BottomNavBar';
import TopBar from '../components/TopBar';
import Deck from './Deck';
import AllHeros from './AllHeros';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import CardSelection from './CardSelection';
import Missions from './Missions';
import { MapInterface, MissionInterface } from '../redux/reducers/types/mission_types';
import { CardBase, CardInterface } from '../redux/reducers/types/collection_types';
import Battle from './Battle';
import LeaderCreation from './LeaderCreation';
import { testData } from '../extra/testData';
import DeckCreation from './DeckCreation';
import { COLORS } from '../constants/colors';
import { allMaps } from '../constants/maps';
import { startLeaderChoices } from '../constants/leaders';
import { allCards } from '../constants/cards';
import { setLeader } from '../redux/reducers/actions/collection_actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

interface MainProps {
}

export const isWeb = Platform.OS === "web";
const BottomTab = createBottomTabNavigator();

export type StackParamList = {
    Missions: {
        map: MapInterface
        heros: CardInterface[]
        leader: CardInterface
    },
    Battle: {
        ownCards: CardInterface[],
        enemyCards: CardInterface[],
        ownLeader: CardInterface,
        enemyLeader: CardInterface,
    },
    Deck: {
        heros: CardInterface[]
    },
    CardSelection: {
        heros: CardInterface[],
    },
    DeckCreation: {
        heros: CardInterface[],
        mission?: MissionInterface,
        leader: CardInterface
    },
    AllHeros: {
        heros: CardInterface[]
    }
}

const DeckStack = createNativeStackNavigator<StackParamList>();
const MissionsStack = createNativeStackNavigator<StackParamList>();
const AllHerosStack = createNativeStackNavigator<StackParamList>();


const Main: React.FC<MainProps> = ({ }) => {
    const { ownedCardIds, discoveredCardIds, leaderId } = useSelector((state: RootState) => state.collection)
    const { currentMapId } = useAppSelector(state => state.missions)
    const dispatch = useAppDispatch();
    const ownedCards = allCards.filter(card => ownedCardIds.includes(card.id))
    const discoveredCards = allCards.filter(card => discoveredCardIds.includes(card.id))
    const currentMap = allMaps.find(map => map.id == currentMapId)
    const [activeTab, setActiveTab] = useState('Deck');
    const leader = leaderId ? startLeaderChoices.find(leader => leader.id == leaderId) : undefined

    const selectLeader = (leaderId: string) => {
        dispatch(setLeader(leaderId))
    }
    const screenOptions: NativeStackNavigationOptions = {
        headerStyle: {
            backgroundColor: COLORS.background,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: () => (
            <View style={{ marginLeft: 15, flexDirection: 'row', alignContent: 'center' }} >
                <View style={{ height: 28, width: 28, alignSelf: 'center' }}>
                    <Image source={require('../assets/general/key3.png')} style={{ width: undefined, height: undefined, flex: 1 }} />
                </View>
                <Text style={{ alignSelf: 'center', color: COLORS.white, fontWeight: 'bold', fontSize: 16, }}>10</Text>
                <View style={{ height: 32, width: 32, alignSelf: 'center' }}>
                    <Image source={require('../assets/general/gem.png')} style={{ width: undefined, height: undefined, flex: 1 }} />
                </View>
                <Text style={{ alignSelf: 'center', color: COLORS.white, fontWeight: 'bold', fontSize: 16, }}>250</Text>
            </View>
        )
    }

    const DeckStackConstructor = () => {
        return (
            <DeckStack.Navigator initialRouteName="Deck" screenOptions={screenOptions}>
                <DeckStack.Screen name="Deck" component={Deck} initialParams={{ heros: ownedCards }} />
                <DeckStack.Screen name="CardSelection" component={CardSelection} />
            </DeckStack.Navigator>
        );
    }

    const MissionsStackConstructor = () => {
        return (
            <MissionsStack.Navigator initialRouteName="Missions" screenOptions={screenOptions}>
                <MissionsStack.Screen name="Missions" component={Missions} initialParams={{ map: currentMap, heros: ownedCards, leader: leader }} />
                <MissionsStack.Screen name="Battle" component={Battle} initialParams={{}} />
                <MissionsStack.Screen name="DeckCreation" component={DeckCreation} initialParams={{}} />
            </MissionsStack.Navigator>
        );
    }

    const AllHerosStackConstructor = () => {
        return (
            <AllHerosStack.Navigator initialRouteName="AllHeros" screenOptions={screenOptions}>
                <AllHerosStack.Screen name="AllHeros" component={AllHeros} initialParams={{ heros: discoveredCards }} />
            </AllHerosStack.Navigator>
        );
    }

    function renderSwitch(param: string) {
        switch (param) {
            case 'Deck':
                return <DeckStack.Screen name="Deck" component={Deck} />
            case 'All cards':
                return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />
            case 'Missions':
                return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />
            default:
                return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />
        }
    }

    const renderContent = () => {
        if (isWeb) {
            return (

                <View style={styles.container}>
                    <TopBar title={activeTab}></TopBar>
                    {renderSwitch(activeTab)}
                    <View style={styles.bottomNavBarContainer} >
                        <BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />
                    </View>
                </View>
            );
        } else {
            return (
                <NavigationContainer>
                    {leader &&
                        <BottomTab.Navigator
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                    switch (route.name) {
                                        case "MissionsContent":
                                            return (
                                                <MaterialCommunityIcon name={"sword-cross"} size={size} color={color} />
                                            )
                                        case "DeckContent":
                                            return (
                                                <MaterialCommunityIcon name={"cards"} size={size} color={color} />
                                            )
                                        case "AllHerosContent":
                                            return (
                                                <MaterialCommunityIcon name={"crystal-ball"} size={size} color={color} />
                                            )

                                        default:
                                            return (<></>)
                                    }
                                    // You can return any component that you like here!
                                },
                                tabBarActiveTintColor: 'tomato',
                                tabBarInactiveTintColor: COLORS.white,
                                headerShown: false,
                                tabBarStyle: { backgroundColor: COLORS.background },
                            })}>
                            <BottomTab.Screen name="MissionsContent" component={MissionsStackConstructor} options={{ title: 'Missions' }} />
                            <BottomTab.Screen name="DeckContent" component={DeckStackConstructor} options={{ title: 'Deck' }} />
                            <BottomTab.Screen name="AllHerosContent" component={AllHerosStackConstructor} options={{ title: 'All Heros' }} />
                        </BottomTab.Navigator>}
                    {!leader && <LeaderCreation leaders={startLeaderChoices} onCreate={(leaderId: string) => { selectLeader(leaderId) }} />}
                </NavigationContainer >
            );
        }
    }

    return (
        <>
            {renderContent()}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    bottomNavBarContainer: {
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Main;