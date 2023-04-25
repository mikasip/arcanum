import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import Main from './containers/Main';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const config = {
  screens: {
    Home: '',
  },
};

const MainStack = createNativeStackNavigator()

const App: React.FC = () => {
  const linking = {
    prefixes: [],
    config: config,
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <MainStack.Navigator>
          <MainStack.Screen name="Home" component={Main}></MainStack.Screen>
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;