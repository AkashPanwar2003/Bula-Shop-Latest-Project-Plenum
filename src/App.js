import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from "react-native-bootsplash";
import AppNavigator from './navigator/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaProvider>

              <AppNavigator />
            </SafeAreaProvider>
          </NavigationContainer>

        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
export default App;
const styles = StyleSheet.create({
  flex1: { flex: 1, backgroundColor: '#ffffff' },
});