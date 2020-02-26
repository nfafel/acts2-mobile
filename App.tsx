import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';

import store, { persistor } from './redux/store'
import MainStack from './components/MainStack';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
              <StatusBar barStyle="dark-content" />
              <MainStack />
            </SafeAreaView>
          </NavigationContainer>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
