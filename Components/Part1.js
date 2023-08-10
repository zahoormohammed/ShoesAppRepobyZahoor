import React, { useState,useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Keyboard
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

const Part1 = () => {

  function showAlert2(value1) {
    Alert.alert('', value1, [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'OK'},
    ]);
  }
  const [descriptionText, setdescriptionText] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {

    if(descriptionText == "")
    {
        showAlert2('Please enter task details');
      
    }
    else{
      const newItem = { id: Date.now(), value: descriptionText };
      setItems([...items, newItem]);

      // Clear the input field
      setdescriptionText('');
      Keyboard.dismiss();
      showAlert2("Task Added Successfully");
    }
    
  };

  const handleDeleteItem = itemId => {
    // Filter out the item with the specified ID
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };


  useEffect(()=> {
    setItems([])
  },[])

  return (

    <View style={{flex: 1,
      padding: 2,}}>
<View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: 'black',
          }}>
          Part 1
        </Text>
      </View>

      <Text
        style={{
          fontSize: 17,
          color: 'black',
          marginLeft: 27,
          marginTop: 7,
          fontWeight: '500',
          marginTop: 20,
          marginBottom: 3,
        }}>
        Enter Task Details
      </Text>

      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 12,
          borderColor: '#D3D3D3',
          marginTop: 3,
        }}>
        <NewAnnTextInput
          multiline
          numberOfLines={4}
          onChangeText={text => setdescriptionText(text)}
          value={descriptionText}
        />
      </View>

      <View style={{ padding: 20, marginBottom: 150 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => handleAddItem()}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#184191',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 50 }}>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <Text>{item.value}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button
                    color="#184191"
                    title="Delete"
                    onPress={() => handleDeleteItem(item.id)}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>

    </View>
    
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

export default Part1;
