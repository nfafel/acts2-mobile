import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import store, { persistor } from './redux/store'
import AuthenticationStack from './components/navigation/AuthenticationStack';


const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <AuthenticationStack />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;