import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
          <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
