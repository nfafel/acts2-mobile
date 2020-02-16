import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'
import LoginPage from './components/LoginPage';

const App: React.FC= () => {
  const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{height: "100%"}}>
          <LoginPage/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
