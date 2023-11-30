import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import Icon1 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoesDetailsTextInput = props => {
  return (
    <TextInput
      style={{fontSize: 15, textAlignVertical: 'top', color: 'black'}}
      {...props}
      editable
      maxLength={500}
    />
  );
};

const AdminScreen = ({navigation}) => {
  function showAlert2(value1) {
    Alert.alert('', value1, [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {text: 'OK'},
    ]);
  }

  const [indexforedit, setindexforedit] = useState('');
  const [editbrand, seteditbrand] = useState('');
  const [editsize, seteditsize] = useState('');
  const [editcost, seteditcost] = useState('');
  const [editshoedetails, seteditshoesdetails] = useState('');

  const [editmodal, seteditmodal] = useState(false);

  const [brand, setonChangebrand] = useState('');
  const [size, setonChangesize] = useState('');
  const [cost, setonChangecost] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionText, setdescriptionText] = useState('');
  const [items, setItems] = useState([]);
  const [shoeData, setShoeData] = useState([]);
  const handleAddItem = async () => {
    if (!brand || !size || !cost || !descriptionText) {
      showAlert2('Brand, size, cost, description cannot be empty!');
      return;
    } else {
      const existingData = await AsyncStorage.getItem('shoeDetails');

      const existingArray = existingData ? JSON.parse(existingData) : [];
      const imageUris = [
        'https://tinyurl.com/yr86vjd7',
        'https://tinyurl.com/2mcuk7b9',
        'https://tinyurl.com/v3mvh2x9',
        'https://tinyurl.com/3tzxx8b5',
        'https://tinyurl.com/3u48csr7',
        'https://tinyurl.com/3p5j332k',
        'https://tinyurl.com/mvh2sw6m',


        
      ];
      const randomImageUri = imageUris[Math.floor(Math.random() * imageUris.length)];
      const imageUri =
      existingArray.length === 0 ? imageUris[0] : existingArray[0].imageUri;

      const newShoe = {
        brand,
        size,
        cost,
        descriptionText,
        imageUri: randomImageUri,
      };

      existingArray.push(newShoe);

      await AsyncStorage.setItem('shoeDetails', JSON.stringify(existingArray));

      showAlert2('Shoes details stored successfully!');
      setonChangebrand('');
      setonChangesize('');
      setonChangecost('');
      setdescriptionText('');

      fetchShoeDetails();
    }
  };

  const handleEditItem = async () => {
    try {
      if (!editbrand || !editsize || !editcost || !editshoedetails) {
        showAlert2('Brand, size, cost, description cannot be empty!');
        return;
      } else {
        const updatedData = [...shoeData];
        updatedData[indexforedit] = {
          brand: editbrand,
          size: editsize,
          cost: editcost,
          descriptionText: editshoedetails,
        };

        setShoeData(updatedData);

        await AsyncStorage.setItem('shoeDetails', JSON.stringify(updatedData));

        showAlert2('Shoe item edited successfully!');
        seteditmodal(false);
      }
    } catch (error) {
      console.error('Error editing shoe item:', error);
    }
  };

  const deleteShoeItem = async index => {
    try {
      const updatedData = [...shoeData];
      updatedData.splice(index, 1);
      setShoeData(updatedData);

      await AsyncStorage.setItem('shoeDetails', JSON.stringify(updatedData));

      showAlert2('Shoe item deleted successfully!');
    } catch (error) {
      console.error('Error deleting shoe item:', error);
    }
  };

  const fetchShoeDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('shoeDetails');

      const parsedData = data ? JSON.parse(data) : [];

      setShoeData(parsedData);
    } catch (error) {
      console.error('Error fetching shoe details:', error);
    }
  };

  useEffect(() => {
    fetchShoeDetails();
  }, []);

  const handleDeleteItem = itemId => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  const EditFunction = (index, brand, size, cost, description) => {
    seteditbrand(brand);
    seteditsize(size);
    seteditcost(cost);
    seteditshoesdetails(description);
    setindexforedit(index);

    seteditmodal(true);
  };


  

  const renderItem = ({item, index}) => (
    <View style={styles.cardContainer}>
      <View style={{alignItems:'center'}}>
      <Image style={{width:150, height:150, alignItems:'center'}} source={{uri:item.imageUri}} />
      </View>
      
      <View style={{alignItems:'center'}}>
      <Text style={styles.brandText}>{`${item.brand}`}</Text>
      <Text style={styles.sizeText}>{`Size Available: ${item.size}`}</Text>
      <Text style={styles.costText}>{`₹${item.cost}`}</Text>
      
     
      </View>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            EditFunction(
              index,
              item.brand,
              item.size,
              item.cost,
              item.descriptionText,
            )
          }
          style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteShoeItem(index)}
          style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const FlatListWithData = (
    <FlatList
      ListHeaderComponent={<View style={{marginTop: 20}} />}
      ListFooterComponent={<View style={{marginBottom: 100}} />}
      data={shoeData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const NoDataAvailable = (
    <View style={{alignItems: 'center'}}>
      <Text style={{color: 'black'}}>No data available</Text>
    </View>
  );

  return (
    <View>
     
        <Modal
          animationType="fade"
          useNativeDriver={true}
          onRequestClose={() => setModalOpen(false)}
          visible={modalOpen}>

            <ScrollView>

           
          <View style={{marginBottom:100}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#3498db',
              }}>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Icon1 name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFValue(17),
                  fontWeight: 'bold',
                  marginLeft: 20,
                }}>
                Add Shoes
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={{fontSize: RFValue(25), color: 'black'}}>
                Add Shoes
              </Text>
            </View>

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Enter Brand Name
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                marginLeft: 20,
                color: 'black',
                marginRight: 20,
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => setonChangebrand(text)}
              value={brand}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Enter Available Size
            </Text>
            <TextInput
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                marginLeft: 20,
                color: 'black',
                marginRight: 20,
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => setonChangesize(text)}
              value={size}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Enter Cost
            </Text>
            <TextInput
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                color: 'black',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => setonChangecost(text)}
              value={cost}
            />
            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Enter Shoes Details
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
              <ShoesDetailsTextInput
                multiline
                numberOfLines={4}
                onChangeText={text => setdescriptionText(text)}
                value={descriptionText}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleAddItem()}
                style={{
                  width: '90%',
                  height: 50,
                  marginBottom:200,
                  marginLeft: 20,
                  marginRight: 20,
                  backgroundColor: '#184191',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(17),
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Add Shoes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </Modal>
      

   

     
        <Modal
          animationType="fade"
          useNativeDriver={true}
          onRequestClose={() => seteditmodal(false)}
          visible={editmodal}>

<ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps="always">
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#3498db',
              }}>
              <TouchableOpacity onPress={() => seteditmodal(false)}>
                <Icon1 name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  marginLeft: 20,
                }}>
                Edit Shoes
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: RFValue(26), color: 'black', marginTop: 30}}>
                Edit Shoes
              </Text>
            </View>

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Brand Name
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                color: 'black',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => seteditbrand(text)}
              value={editbrand}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Available Size
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                color: 'black',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => seteditsize(text)}
              value={editsize}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Cost
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                marginLeft: 20,
                marginRight: 20,
                color: 'black',
                borderRadius: 12,
                borderColor: '#D3D3D3',
                marginTop: 3,
              }}
              onChangeText={text => seteditcost(text)}
              value={editcost}
            />
            <Text
              style={{
                fontSize: RFValue(15),
                color: 'black',
                marginLeft: 27,
                marginTop: 7,
                fontWeight: '500',
                marginTop: 20,
                marginBottom: 3,
              }}>
              Shoes Details
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
              <ShoesDetailsTextInput
                multiline
                numberOfLines={4}
                onChangeText={text => seteditshoesdetails(text)}
                value={editshoedetails}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleEditItem()}
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: '#184191',
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(17),
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Edit Shoes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </Modal>
 

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
              fontSize: RFValue(22),
              color: 'black',
            }}>
            Admin Dasboard
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              width: '40%',
              height: 50,
              backgroundColor: '#184191',
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(15),
                color: 'white',
                fontWeight: 'bold',
              }}>
              Add Shoes
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{padding: 20, marginBottom: 200}}>
          <View style={{marginTop: 10, marginBottom: 100}}>
            <View>
              {shoeData.length > 0 ? FlatListWithData : NoDataAvailable}
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
  cardContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  brandText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  sizeText: {
    fontSize: RFValue(15),
    color: 'black',
  },
  costText: {
    fontSize: RFValue(20),
    color: 'black',
  },
  descriptionText: {
    fontSize: RFValue(15),
    marginTop: 8,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminScreen;
