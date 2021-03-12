/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H_W} from '../CeComp/CeDim';
import WrapperScreen from '../CeComp/WrapperScreen';
import {connect} from 'react-redux';
import Data from '../CeData';
import {colors} from '../CeComp/CeColor';
import NavigationRef from '../CeComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CeremoveFavAction,
  CesetFavAction,
  CeaddCartAction,
  CeremoveCartAction,
} from '../CeRedux/CeActions';

function SingleProduct(props) {
  useEffect(() => {
    fetchFlavours();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [flavours, setFlavours] = useState([]);
  const [CurrFlavours, setCurrFlavours] = useState({});
  const CeProduct = props.CeProduct;

  const fetchFlavours = () => {
    let fc = 0;
    let fl = [];
    for (let ce = 0; ce < Data.topping.length; ce++) {
      if (Data.topping[ce].productid === CeProduct.id) {
        fl.push(Data.topping[ce]);
        if (fc === 3) {
          break;
        }
        fc++;
      }
    }
    setCurrFlavours(fl[0]);
    setFlavours(fl);
  };

  const CeAddToCart = () => {
    props.CeaddCartAction({...CeProduct, flavor: CurrFlavours});
  };
  const CeRemoveFromCart = () => {
    props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`].added !== 0 &&
      props.CeremoveCartAction({...CeProduct, flavor: CurrFlavours});
  };

  const CeGoBack = () => NavigationRef.Navigate('CeHome');

  return (
    <WrapperScreen style={{backgroundColor: `rgba(${colors.rgb_Primary},0.6)`}}>
      <View style={styles.singleProduct_CE20}>
        <View style={styles.singleProduct_CE19}>
          <ImageBackground
            resizeMode="contain"
            source={CeProduct.images}
            style={styles.singleProduct_CE18}>
            <View style={styles.singleProduct_CE3}>
              <TouchableOpacity
                style={styles.singleProduct_CE4}
                onPress={CeGoBack}>
                <Entypo
                  name="chevron-left"
                  color="black"
                  size={H_W.width * 0.08}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            ...styles.singleProduct_CE16,
            marginBottom: -insets.bottom,
            paddingBottom: insets.bottom,
            height: H_W.height * 0.62 - insets.bottom,
          }}>
          <View style={styles.singleProduct_CE15}>
            <View style={{marginTop: -HEIGHT * 0.04}}>
              {props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`] !==
                undefined &&
              props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`] !== 0 ? (
                <View style={styles.singleProduct_CE2}>
                  <TouchableOpacity
                    style={{...styles.singleProduct_CE5, height: HEIGHT * 0.05}}
                    onPress={CeRemoveFromCart}>
                    <Entypo
                      name="minus"
                      color="black"
                      size={H_W.width * 0.065}
                    />
                  </TouchableOpacity>
                  <Text style={styles.singleProduct_CE23}>
                    {props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`] !==
                      undefined &&
                    props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`] !==
                      0
                      ? props.CeCart[`${CeProduct.id}_${CurrFlavours.topping}`]
                          .added
                      : '0'}
                  </Text>
                  <TouchableOpacity
                    onPress={CeAddToCart}
                    style={{
                      ...styles.singleProduct_CE6,
                      height: HEIGHT * 0.05,
                    }}>
                    <Entypo
                      name="plus"
                      color="black"
                      size={H_W.width * 0.065}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={CeAddToCart}
                  style={styles.singleProduct_CE7}>
                  <Entypo name="plus" color="black" size={30} />
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={{...styles.singleProduct_CE12, marginTop: HEIGHT * 0.02}}>
              {CeProduct.names}
            </Text>
            <Text style={styles.singleProduct_CE11}>${CeProduct.price}</Text>
          </View>
          <View
            style={{...styles.singleProduct_CE8, marginBottom: HEIGHT * 0.02}}>
            {flavours.map((fl, index) => (
              <View
                key={index}
                style={{
                  alignSelf:
                    index === 0
                      ? 'flex-start'
                      : index === 1
                      ? 'center'
                      : 'flex-end',
                  ...styles.singleProduct_CE9,
                }}>
                <Text style={styles.singleProduct_CE10}>{fl.topping}</Text>
                <TouchableOpacity
                  onPress={() => setCurrFlavours(fl)}
                  style={styles.singleProduct_CE14}>
                  {CurrFlavours.topping === fl.topping ? (
                    <FontAwesome
                      name="circle"
                      color={colors.primary}
                      size={22}
                    />
                  ) : (
                    <Entypo name="plus" color="black" size={22} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{marginBottom: '10%'}}>
            <Text style={styles.singleProduct_CE13}>{CeProduct.details}</Text>
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  singleProduct_CE23: {
    fontWeight: 'bold',
    fontSize: H_W.width * 0.056,
  },
  singleProduct_CE20: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleProduct_CE19: {
    width: H_W.width,
    height: '37%',
    paddingHorizontal: H_W.width * 0.05,
  },
  singleProduct_CE18: {width: '100%', height: '100%'},
  singleProduct_CE16: {
    backgroundColor: 'white',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    width: H_W.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_W.width * 0.05,
    paddingBottom: H_W.height * 0.02,
  },
  singleProduct_CE15: {
    width: '100%',
    marginBottom: H_W.height * 0.01,
  },
  singleProduct_CE14: {
    width: H_W.width * 0.11,
    height: H_W.width * 0.11,
    borderRadius: 50,
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_CE13: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGray,
    lineHeight: 22,
  },
  singleProduct_CE12: {
    width: '85%',
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
  },
  singleProduct_CE11: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 26,
    textShadowColor: 'black',
    textShadowOffset: {width: 1.2, height: 1.2},
    textShadowRadius: 2,
  },
  singleProduct_CE10: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: H_W.width * 0.02,
  },
  singleProduct_CE9: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingLeft: H_W.width * 0.03,
    backgroundColor: colors.primary,
    elevation: 2,
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_CE8: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_CE7: {
    width: H_W.width * 0.17,
    height: H_W.width * 0.17,
    borderRadius: 50,
    backgroundColor: `rgba(${colors.rgb_Primary},0.5)`,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1.5,
  },
  singleProduct_CE6: {
    width: '26%',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  singleProduct_CE5: {
    width: '26%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  singleProduct_CE4: {
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  singleProduct_CE3: {
    marginTop: H_W.height * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleProduct_CE2: {
    borderColor: 'black',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 50,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => {
  return {
    CeProduct: state.CeCrntPrdtReducer,
    CeFavs: state.CeToggleFav,
    CeCart: state.CeCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  CesetFavAction,
  CeremoveFavAction,
  CeremoveCartAction,
  CeaddCartAction,
})(React.memo(SingleProduct));
