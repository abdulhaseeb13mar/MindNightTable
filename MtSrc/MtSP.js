/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H_W} from '../MtComp/MtDim';
import WrapperScreen from '../MtComp/WrapperScreen';
import {connect} from 'react-redux';
import Data from '../MTData';
import {colors} from '../MtComp/MtColor';
import NavigationRef from '../MtComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  MtremoveFavAction,
  MtsetFavAction,
  MtaddCartAction,
  MtremoveCartAction,
} from '../MtRedux/MtActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
function SingleProduct(props) {
  useEffect(() => {}, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [flavours, setFlavours] = useState([]);
  const [CurrFlavours, setCurrFlavours] = useState({});
  const MtProduct = props.MtProduct;

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
        <View
          style={{
            ...border,
            marginVertical: HEIGHT * 0.01,
            marginHorizontal: H_W.width * 0.02,
            paddingHorizontal: H_W.width * 0.03,
            paddingVertical: HEIGHT * 0.01,
          }}>
          <AntDesign name="hearto" size={24} color={colors.primary} />
        </View>
      </View>
      <View
        style={{
          height: 400,
          marginHorizontal: H_W.width * 0.02,
          marginVertical: HEIGHT * 0.01,
        }}>
        <View
          style={{
            // ...border,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            // shadowRadius: 10.32,
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
            //imageStyle={{}}
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
            {props.MtProduct.price}
          </Text>
        </TouchableOpacity>
      </View>
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
