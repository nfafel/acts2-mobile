import React from 'react';
import {
  StatusBar
} from 'react-native';

import { Provider as ReduxProvider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import store, { persistor } from './redux/store'
import MainStack from './components/MainStack';


const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MenuProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
              <MainStack />
            </NavigationContainer>
          </MenuProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;