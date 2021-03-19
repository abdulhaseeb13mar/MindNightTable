/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  MtremoveFavAction,
  MtsetFavAction,
  MtaddCartAction,
  MtremoveCartAction,
} from '../MtRedux/MtActions';
import Data from '../MTData';
import Loop from '../MtComp/MtFlatList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {H_W} from '../MtComp/MtDim';
import WrapperScreen from '../MtComp/WrapperScreen';
import {colors} from '../MtComp/MtColor';
import NavigationRef from '../MtComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

function MtOrder(props) {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const MtProduct = props.MtProduct;
  const [ItemCart, setItemCart] = useState(1);
  const [extraItems, setextraItems] = useState([]);
  useEffect(() => {
    additionalFilterItems();
  }, []);

  const additionalFilterItems = () => {
    var filteredData = Data.Ingredients.filter(
      (filterItem) => filterItem.ProductId === props.MtProduct.id,
    );
    setextraItems(filteredData);
  };

  const MtGoBack = () => NavigationRef.GoBack();

  const addItem = () => {
    var addItemProduct = ItemCart + 1;
    setItemCart(addItemProduct);
  };
  const subtractItem = () => {
    if (ItemCart == 1) return;

    var minusItemProduct = ItemCart - 1;
    setItemCart(minusItemProduct);
  };
  return (
    <WrapperScreen>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={
            {
              // marginVertical: HEIGHT * 0.01,
              // marginHorizontal: H_W.width * 0.02,
              // paddingHorizontal: H_W.width * 0.03,
              // paddingVertical: HEIGHT * 0.015,
            }
          }>
          <Text
            style={{
              marginHorizontal: H_W.width * 0.06,
              marginVertical: HEIGHT * 0.02,
              fontWeight: '800',
              fontSize: 45,
              color: colors.primary,
              alignSelf: 'flex-start',
            }}>
            My Order
          </Text>
        </View>
        <TouchableOpacity onPress={MtGoBack}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              marginVertical: HEIGHT * 0.02,
              marginHorizontal: H_W.width * 0.02,
              paddingHorizontal: H_W.width * 0.03,
              paddingVertical: HEIGHT * 0.01,
            }}>
            <Entypo name="cross" color={colors.primary} size={24} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 6,
          marginVertical: HEIGHT * 0.01,
          marginHorizontal: H_W.width * 0.02,
          paddingVertical: HEIGHT * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          backgroundColor: 'white',
        }}>
        <ImageBackground
          source={props.MtProduct.images}
          //imageStyle={{}}
          style={{width: '100%', height: HEIGHT * 0.3}}
          resizeMode="contain"
        />
        <Text
          style={{
            marginHorizontal: H_W.width * 0.06,
            marginVertical: HEIGHT * 0.02,
            fontWeight: '800',
            fontSize: 35,
            color: colors.primary,
            alignSelf: 'flex-start',
          }}>
          {props.MtProduct.productName}
        </Text>
        <View style={{alignSelf: 'flex-end'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: H_W.width * 0.06,
            }}>
            <TouchableOpacity onPress={subtractItem}>
              <Feather name="minus" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginHorizontal: H_W.width * 0.03,
              }}>
              {ItemCart}
            </Text>
            <TouchableOpacity onPress={addItem}>
              <Feather name="plus" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: HEIGHT * 0.02,
          marginHorizontal: H_W.width * 0.02,
        }}>
        <Text
          style={{
            color: colors.primary,
            fontWeight: 'bold',
            fontSize: 18,
            textTransform: 'uppercase',
          }}>
          ADD :{' '}
        </Text>
      </View>
      <Loop
        data={extraItems}
        renderItem={({item}) => <FilterDataLoop item={item} />}
      />
      <TouchableOpacity
        // onPress={OrderScreen}
        style={{
          ...border,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
          marginTop: H_W.width * 0.02,
          marginHorizontal: H_W.width * 0.02,
          marginVertical: HEIGHT * 0.01,
        }}>
        <Text
          style={{
            height: H_W.width * 0.1,
            marginTop: H_W.width * 0.05,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: H_W.width * 0.1,
          }}>
          MAKE ORDER
        </Text>
        <Text
          style={{
            height: H_W.width * 0.1,
            marginTop: H_W.width * 0.05,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            marginRight: H_W.width * 0.1,
          }}>
          {props.MtProduct.price}
        </Text>
      </TouchableOpacity>

      {/* {extraItems.map((item) => (
        <FilterDataLoop item={item} />
      ))} */}
    </WrapperScreen>
  );
}
const border = {
  borderWidth: 1,
  borderColor: colors.primary,
};

export const FilterDataLoop = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  //   console.log(item);
  return (
    <View
      style={{
        //...border,
        borderRadius: 6,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        marginHorizontal: H_W.width * 0.02,
        paddingHorizontal: H_W.width * 0.05,
        paddingVertical: HEIGHT * 0.015,
      }}>
      <ImageBackground
        source={props.item.Images}
        //imageStyle={{}}
        style={{width: '100%', height: HEIGHT * 0.09}}
        resizeMode="contain"
      />
      <Text
        style={{
          color: colors.primary,
          fontWeight: 'bold',
          fontSize: 18,
          textTransform: 'capitalize',
        }}>
        {props.item.Name}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    MtProduct: state.MtCrntPrdtReducer,
    MtFavs: state.MtToggleFav,
    MtCart: state.MtCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  MtsetFavAction,
  MtremoveFavAction,
  MtremoveCartAction,
  MtaddCartAction,
})(React.memo(MtOrder));
