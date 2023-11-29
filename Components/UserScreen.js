import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
const Part2 = () => {
  function showAlert2(value1) {
    Alert.alert('', value1, [{text: 'OK'}]);
  }

  const [cartItems, setCartItems] = useState([]);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [brand, setonChangebrand] = useState('');
  const [size, setonChangesize] = useState('');
  const [cost, setonChangecost] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionText, setdescriptionText] = useState('');
  const [items, setItems] = useState([]);
  const [shoeData, setShoeData] = useState([]);

  const [cartmodal, setcartmodal] = useState(false);

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

  useEffect(() => {
    setItems([]);
  }, []);

  const addToCart = (item, index) => {
    
    const isItemInCart = cartItems.some(cartItem => cartItem.index === index);

    if (isItemInCart) {
      Alert.alert('Item Already Added', 'This item is already in your cart.');
    } else {
      setCartCount(cartCount + 1);

      
      setCartItems(prevCart => [...prevCart, {...item, index, quantity: 1}]);

    
      showAlert2('Item Added to Cart');
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.cardContainer}>
      <Text style={styles.brandText}>{`Brand: ${item.brand}`}</Text>
      <Text style={styles.sizeText}>{`Size: ${item.size}`}</Text>
      <Text style={styles.costText}>{`Cost: ${item.cost}`}</Text>
      <Text
        style={
          styles.descriptionText
        }>{`ShoesDetails: ${item.descriptionText}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => addToCart(item, index)}
          style={styles.deleteButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
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

  const closeModal = () => {
    setModalVisible(false);
  };

  const incrementQuantity = index => {
  
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.index === index ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementQuantity = index => {
   
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.index === index
          ? {...item, quantity: Math.max(item.quantity - 1, 1)}
          : item,
      ),
    );
  };

  const renderItem1 = ({item}) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 30,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: RFValue(17),
            color: 'black',
          }}>{`${item.brand}`}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(14),
              marginTop: 5,
              marginRight: 20,
              color: 'black',
            }}>{` $${item.cost * item.quantity}`}</Text>
          <TouchableOpacity
            onPress={() => decrementQuantity(item.index)}
            style={{
              backgroundColor: '#3498db',
              borderRadius: 5,
              padding: 8,
              marginRight: 10,
            }}>
            <Text style={{color: 'white', fontSize: RFValue(15)}}>-</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: RFValue(15),
              marginHorizontal: 3,
              color: 'black',
            }}>{`${item.quantity}`}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item.index)}
            style={{
              backgroundColor: '#3498db',
              borderRadius: 5,
              padding: 8,
              marginLeft: 10,
            }}>
            <Text style={{color: 'white', fontSize: RFValue(15)}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginRight: 10}}>
        <TouchableOpacity
          onPress={() => deleteCartItem(item.index)}
          style={{
            borderRadius: 5,
          }}>
          <Icon1 name="delete" size={35} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const deleteCartItem = index => {
    setCartItems(prevCart => prevCart.filter(item => item.index !== index));

    setCartCount(cartCount - 1);
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0,
  );

  const checkCardFunction = () => {
    if (cartCount == 0) {
      showAlert2('Cart is empty');
    } else {
      setcartmodal(true);
    }
  };

  return (
    <View>
      <ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps="always">
        <Modal
          animationType="fade"
          useNativeDriver={true}
          onRequestClose={() => setcartmodal(false)}
          visible={cartmodal}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#3498db',
            }}>
            <TouchableOpacity onPress={() => setcartmodal(false)}>
              <Icon2 name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: RFValue(18),
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Cart
            </Text>
          </View>
          <View style={{marginBottom: 200}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: RFValue(26), color: 'black', marginTop: 30}}>
                Cart
              </Text>
            </View>

            <FlatList
              data={cartItems}
              renderItem={renderItem1}
              keyExtractor={item => item.index.toString()}
            />

          
            <View
              style={{
                padding: 10,
                borderTopWidth: 1,
                borderTopColor: '#ddd',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontWeight: 'bold',
                  color: 'black',
                }}>{`Total Cost: $${totalCost.toFixed(2)}`}</Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#3498db',
                  padding: 10,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontSize: RFValue(15)}}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

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
            User Screen
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
            onPress={() => checkCardFunction(true)}
            style={{
              width: '40%',
              height: 50,
              backgroundColor: '#184191',
              borderRadius: 20,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="cart-plus"
              size={20}
              color="white"
              style={{marginRight: 5}}
            />
            <Text
              style={{
                fontSize: RFValue(15),
                color: 'white',
                fontWeight: 'bold',
              }}>
              Cart
            </Text>
          </TouchableOpacity>

       
          {cartCount > 0 && (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 10,
                height: 25,
                width: 25,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 2,
                right: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {cartCount}
              </Text>
            </View>
          )}

         
          <Modal visible={modalOpen1} animationType="slide">
           
           
          </Modal>
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
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: 'black',
  },
  sizeText: {
    fontSize: RFValue(16),
    color: 'black',
  },
  costText: {
    fontSize: RFValue(16),
    color: 'black',
  },
  descriptionText: {
    fontSize: RFValue(16),
    marginTop: 8,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Part2;
