import React from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import MainPage from '../pages/MainPage';
import LoginModal from '../pages/LandingPage';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        cardOverlayEnabled: true,
        headerTitleStyle: {
          fontFamily: 'Poppins_600SemiBold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={MainStack}
        options={{
          title: 'ImageUs',
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          stackPresentation: 'formSheet',
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerShown: false,
          gestureEnabled: false,
        }}
        component={LoginModal}
      />
    </Stack.Navigator>
  );
}

export default RootStack;