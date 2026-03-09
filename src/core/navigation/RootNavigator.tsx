import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../../features/splash/presentation/SplashScreen';
import LoginScreen from '../../features/auth/presentation/LoginScreen';
import { RootStackParamList, ROUTES } from './routes';
import SignUpScreen from '../../features/auth/presentation/SignUpScreen';
import HomeScreen from '../../features/home/presentation/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.Splash}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name={ROUTES.Splash} component={SplashScreen} />
        <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
        <Stack.Screen name={ROUTES.CreateAccount} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.DashBoard} component={HomeScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;