import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Part1 from './Components/Part1';
import Part2 from './Components/Part2';
import MainPage from './Components/MainPage';
const Stack = createStackNavigator();
const NewAnnTextInput = props => {
  return (
    <TextInput
      style={{ fontSize: 15, textAlignVertical: 'top', color: 'black' }}
      {...props}
      editable
      maxLength={500}
    />
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Define screens using Stack.Screen */}
        <Stack.Screen options={{headerShown: false}} name="MainPage" component={MainPage} />
        <Stack.Screen options={{headerShown: false}} name="Part1" component={Part1} />
        <Stack.Screen options={{headerShown: false}} name="Part2" component={Part2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    marginTop: 20,
  },
});

export default App;
