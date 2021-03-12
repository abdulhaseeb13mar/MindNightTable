import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './CeComp/RefNavigation';
import CeHome from './CeSrc/CeHome';
import CeSP from './CeSrc/CeSP';
import CeCart from './CeSrc/CeCart';
import CeContact from './CeSrc/CeContact';
import CeSearch from './CeSrc/CeSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="CeHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="CeHome" component={CeHome} />
        <Stack.Screen name="CeSP" component={CeSP} />
        <Stack.Screen name="CeCart" component={CeCart} />
        <Stack.Screen name="CeSearch" component={CeSearch} />
        <Stack.Screen name="CeContact" component={CeContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
