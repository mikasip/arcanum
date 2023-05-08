import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import BottomNavBar from '../components/BottomNavBar';
import TopBar from '../components/TopBar';
import Deck from './Deck';
import AllHeros from './AllHeros';
import CardSelection from './CardSelection';
import Missions from './Missions';
import Battle from './Battle';
import LeaderCreation from './LeaderCreation';
import DeckCreation from './DeckCreation';
import { COLORS } from '../constants/colors';
import { startLeaderChoices } from '../constants/leaders';
import { setLeader } from '../redux/reducers/actions/collection_actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { StackParamList } from '../types';
import { CardInterface } from '../types/collection_types';

interface MainProps {}

export const isWeb = Platform.OS === 'web';
const BottomTab = createBottomTabNavigator();

const DeckStack = createNativeStackNavigator<StackParamList>();
const MissionsStack = createNativeStackNavigator<StackParamList>();
const AllHerosStack = createNativeStackNavigator<StackParamList>();

const RightHeader = () => {
  const { gemCount, keyCount } = useSelector(
    (state: RootState) => state.collection,
  );
  return (
    <View
      style={{ marginLeft: 15, flexDirection: 'row', alignContent: 'center' }}
    >
      <View style={{ height: 28, width: 28, alignSelf: 'center' }}>
        <Image
          source={require('../assets/general/key3.png')}
          style={{ width: undefined, height: undefined, flex: 1 }}
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          color: COLORS.white,
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {keyCount}
      </Text>
      <View style={{ height: 32, width: 32, alignSelf: 'center' }}>
        <Image
          source={require('../assets/general/gem.png')}
          style={{ width: undefined, height: undefined, flex: 1 }}
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          color: COLORS.white,
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {gemCount}
      </Text>
    </View>
  );
};

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.background,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: RightHeader,
};

const DeckStackConstructor = () => {
  return (
    <DeckStack.Navigator initialRouteName="Deck" screenOptions={screenOptions}>
      <DeckStack.Screen name="Deck" component={Deck} />
      <DeckStack.Screen name="CardSelection" component={CardSelection} />
    </DeckStack.Navigator>
  );
};

const MissionsStackConstructor = () => {
  return (
    <MissionsStack.Navigator
      initialRouteName="Missions"
      screenOptions={screenOptions}
    >
      <MissionsStack.Screen name="Missions" component={Missions} />
      <MissionsStack.Screen name="Battle" component={Battle} />
      <MissionsStack.Screen name="DeckCreation" component={DeckCreation} />
    </MissionsStack.Navigator>
  );
};

const AllHerosStackConstructor = () => {
  return (
    <AllHerosStack.Navigator
      initialRouteName="AllHeros"
      screenOptions={screenOptions}
    >
      <AllHerosStack.Screen
        name="AllHeros"
        component={AllHeros}
        initialParams={{}}
      />
    </AllHerosStack.Navigator>
  );
};

const Main: React.FC<MainProps> = () => {
  const { leader } = useAppSelector((state: RootState) => state.collection);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Deck');

  const selectLeader = (newLeader: CardInterface) => {
    dispatch(setLeader(newLeader));
  };

  function renderSwitch(param: string) {
    switch (param) {
      case 'Deck':
        return <DeckStack.Screen name="Deck" component={Deck} />;
      case 'All cards':
        return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />;
      case 'Missions':
        return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />;
      default:
        return <AllHerosStack.Screen name="AllHeros" component={AllHeros} />;
    }
  }

  const renderContent = () => {
    if (isWeb) {
      return (
        <View style={styles.container}>
          <TopBar title={activeTab} />
          {renderSwitch(activeTab)}
          <View style={styles.bottomNavBarContainer}>
            <BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />
          </View>
        </View>
      );
    }
    return (
      <NavigationContainer>
        {leader && (
          <BottomTab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                switch (route.name) {
                  case 'MissionsContent':
                    return (
                      <MaterialCommunityIcon
                        name="sword-cross"
                        size={size}
                        color={color}
                      />
                    );
                  case 'DeckContent':
                    return (
                      <MaterialCommunityIcon
                        name="cards"
                        size={size}
                        color={color}
                      />
                    );
                  case 'AllHerosContent':
                    return (
                      <MaterialCommunityIcon
                        name="crystal-ball"
                        size={size}
                        color={color}
                      />
                    );

                  default:
                    return null;
                }
                // You can return any component that you like here!
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: COLORS.white,
              headerShown: false,
              tabBarStyle: { backgroundColor: COLORS.background },
            })}
          >
            <BottomTab.Screen
              name="MissionsContent"
              component={MissionsStackConstructor}
              options={{ title: 'Missions' }}
            />
            <BottomTab.Screen
              name="DeckContent"
              component={DeckStackConstructor}
              options={{ title: 'Deck' }}
            />
            <BottomTab.Screen
              name="AllHerosContent"
              component={AllHerosStackConstructor}
              options={{ title: 'All Heros' }}
            />
          </BottomTab.Navigator>
        )}
        {!leader && (
          <LeaderCreation
            leaders={startLeaderChoices}
            onCreate={(newLeader: CardInterface) => {
              selectLeader(newLeader);
            }}
          />
        )}
      </NavigationContainer>
    );
  };

  return <>{renderContent()}</>;
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
