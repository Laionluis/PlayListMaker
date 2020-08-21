import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Spotify from "./pages/spotify";
import Navigation from './navigation/routeNavigation.js'

export default class App extends React.Component {
  constructor(props) {
      super(props)
  }
  render() {
    return (
      <Navigation/>
    );
  }
}