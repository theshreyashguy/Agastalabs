/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App(): React.JSX.Element {
  

  return (
    <GestureHandlerRootView style = {{flex:1}}>
      <AppNavigation/>
    </GestureHandlerRootView>
   
  );
}



export default App;
