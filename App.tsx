import { SafeAreaView, View } from 'react-native';
import React from 'react';
import GoogleMapsScreen from './Components/GoogleMapsScreen';
import 'react-native-get-random-values';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <GoogleMapsScreen />
      </View>
    </SafeAreaView>
  );
};

export default App;