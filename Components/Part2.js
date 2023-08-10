import React, { useState,useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SectionList,
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

const Part2 = () => {
  function showAlert2(value1) {
    Alert.alert('', value1, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK' },
    ]);
  }

  const [descriptionText, setdescriptionText] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (descriptionText.trim() === '') {
      showAlert2('Please enter task details');
      return;
    }

    const newItem = { id: Date.now(), value: descriptionText };
    setItems([...items, newItem]);

    
    setdescriptionText('');
    Keyboard.dismiss();
    showAlert2("Task Added Successfully");
  };

  const handleDeleteItem = itemId => {
   
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  const generateSectionData = itemList => {
    const sections = [];
    const sectionMap = new Map();

    itemList.forEach(item => {
      const firstLetter = item.value.charAt(0).toUpperCase();

      if (!sectionMap.has(firstLetter)) {
        sectionMap.set(firstLetter, true);
        sections.push({ title: firstLetter, data: [] });
      }

      const index = sections.findIndex(section => section.title === firstLetter);
      sections[index].data.push(item);
    });

    return sections;
  };

  const sections = generateSectionData(items);

  
  const filteredSections = sections.filter(section => {
    
    return descriptionText === '' || section.title === descriptionText.charAt(0).toUpperCase();
  });


  useEffect(()=> {
    setItems([])
  },[])

  return (
    <View style={{ flex: 1, padding: 2 }}>
      <View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
            }}>
            Part 2
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

        <View style={{ padding: 20, marginBottom: 10 }}>
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
        </View>
      </View>

      <View style={{ flex: 1, padding: 2 }}>
        <View>
          <View>
            <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
              <SectionList
                sections={filteredSections}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
                )}
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

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
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

export default Part2;
