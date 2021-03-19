import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './MtComp/RefNavigation';
import MtHome from './MtSrc/MtHome';
import MtSP from './MtSrc/MtSP';
import MtOrder from './MtSrc/MtOrder';
// import MtCart from './MtSrc/MtCart';
// import MtContact from './MtSrc/MtContact';
// import MtSearch from './MtSrc/MtSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="MtHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="MtHome" component={MtHome} />
        <Stack.Screen name="MtSP" component={MtSP} />
        <Stack.Screen name="MtOrder" component={MtOrder} />
        {/* <Stack.Screen name="MtCart" component={MtCart} />
        <Stack.Screen name="MtSearch" component={MtSearch} />
        <Stack.Screen name="MtContact" component={MtContact} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
