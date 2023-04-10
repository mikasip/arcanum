import React from 'react';
import { SafeAreaView, StatusBar, } from 'react-native';
import Main from './src/containers/Main';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
        <Main />
    </Provider>
  );
};

export default App;