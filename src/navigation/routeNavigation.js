import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Spotify from "../pages/spotify";
import Deezer from "../pages/deezer";
import Login from '../login.js'

import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
        initialRouteName="Login"
        >
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Spotify"
            component={Spotify}
          />
          <Stack.Screen
            name="Deezer"
            component={Deezer}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
