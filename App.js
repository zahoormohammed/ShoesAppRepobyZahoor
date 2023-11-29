import React, {useState} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from './Components/UserScreen';
import AdminScreen from './Components/AdminScreen';


import MainPage from './Components/MainPage';
const Stack = createStackNavigator();

const App = () => {
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Define screens using Stack.Screen */}
        <Stack.Screen
          options={{headerShown: false}}
          name="MainPage"
          component={MainPage}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AdminScreen"
          component={AdminScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserScreen"
          component={UserScreen}
        />
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
