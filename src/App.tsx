import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';

import { RoutersApp } from './routes/app.routers';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import theme from './global/styles/theme';
import { firebaseConfig } from './services/fireBaseConfig';

export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <RoutersApp />
    </ThemeProvider>
  );
}
