import React from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import GroupDrawer from './GroupDrawer';
import MainPage from './MainPage';
import LoginModal from './LoginModal';
import PhotoModal from './PhotoModal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function MainStack() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={() => <GroupDrawer />}>
      <Drawer.Screen
        name="Home"
        component={MainPage}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'ImageUs',
          headerLeft: () => (<Ionicons name="ios-reorder-three-sharp" size={36} onPress={() => navigation.toggleDrawer()} />),
        })}
      />
    </Drawer.Navigator>
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
          headerShown: false,
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
      <Stack.Screen
        name="PhotoDetail"
        options={{
          cardStyleInterpolator: forFade,
          cardStyle: { backgroundColor: 'rgba(0,0,0, 0.7)' },
          cardOverlayEnabled: true,
          headerStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
        component={PhotoModal}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
