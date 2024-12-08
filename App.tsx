
import React from 'react';
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
