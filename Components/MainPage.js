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

const MainPage = ({navigation}) => {


    return(
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:20,
            marginRight:20,
            flex:1,
            marginTop: 20,
          }}>
          <TouchableOpacity onPress={()=>navigation.navigate('Part1')}
            // onPress={() => handleAddItem()}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#184191',
             
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
             Part 1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Part2')}
            // onPress={() => handleAddItem()}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#184191',
             
              marginTop:50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
           Part 2
            </Text>
          </TouchableOpacity>
        </View>
      
    )
    
  
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

export default MainPage;
