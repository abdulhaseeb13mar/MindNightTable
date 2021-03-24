/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {H_W} from '../MtComp/MtDim';
import WrapperScreen from '../MtComp/WrapperScreen';
import {connect} from 'react-redux';
import Data from '../MTData';
import {colors} from '../MtComp/MtColor';
import NavigationRef from '../MtComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  MtremoveFavAction,
  MtsetFavAction,
  MtaddCartAction,
  MtremoveCartAction,
} from '../MtRedux/MtActions';
import AntDesign from 'react-native-vector-icons/AntDesign';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [fav, setFav] = useState(false);
  const [CurrFlavours, setCurrFlavours] = useState({});
  const MtProduct = props.MtProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.MtFavs.length; us++) {
      if (props.MtFavs[us].id === MtProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.MtremoveFavAction(MtProduct.id)
      : props.MtsetFavAction(MtProduct);
    setFav(!fav);
  };

  const MtAddToCart = () => {
    props.MtaddCartAction({...MtProduct, flavor: CurrFlavours});
  };
  const MtRemoveFromCart = () => {
    props.MtCart[`${MtProduct.id}_${CurrFlavours.topping}`].added !== 0 &&
      props.MtremoveCartAction({...MtProduct, flavor: CurrFlavours});
  };

  const MtGoBack = () => NavigationRef.GoBack();
  const OrderScreen = () => NavigationRef.Navigate('MtOrder');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={MtGoBack}>
            <View
              style={{
                ...border,
                marginVertical: HEIGHT * 0.01,
                marginHorizontal: H_W.width * 0.02,
                paddingHorizontal: H_W.width * 0.03,
                paddingVertical: HEIGHT * 0.01,
              }}>
              <Entypo name="chevron-left" color="black" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              ...border,
              marginVertical: HEIGHT * 0.01,
              marginHorizontal: H_W.width * 0.02,
              paddingHorizontal: H_W.width * 0.03,
              paddingVertical: HEIGHT * 0.01,
            }}>
            <AntDesign
              name={fav ? 'heart' : 'hearto'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: H_W.width * 0.02,
            marginVertical: HEIGHT * 0.01,
          }}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 5.46,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                marginHorizontal: H_W.width * 0.06,
                marginVertical: HEIGHT * 0.02,
                fontWeight: '800',
                fontSize: 40,
                color: colors.primary,
                alignSelf: 'flex-start',
              }}>
              {props.MtProduct.productName}
            </Text>
            <ImageBackground
              source={props.MtProduct.images}
              style={{width: '100%', height: HEIGHT * 0.4}}
              resizeMode="contain"
            />
            <View
              style={{
                marginHorizontal: H_W.width * 0.06,
                marginVertical: HEIGHT * 0.01,
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 20,
                  color: colors.primary,
                  alignSelf: 'flex-start',
                  marginBottom: HEIGHT * 0.01,
                }}>
                DESCRIPTION
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 20,
                  color: 'black',
                  alignSelf: 'flex-start',
                  marginBottom: HEIGHT * 0.01,
                }}>
                {props.MtProduct.discription}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={OrderScreen}
            style={{
              ...border,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colors.primary,
              marginTop: H_W.width * 0.02,
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
              ${props.MtProduct.price}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const border = {
  borderWidth: 1,
  borderRadius: 6,
  borderColor: colors.primary,
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
})(React.memo(SingleProduct));
