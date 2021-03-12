/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../CeComp/WrapperScreen';
import {colors} from '../CeComp/CeColor';
import {H_W} from '../CeComp/CeDim';
import Data from '../CeData';
import Loop from '../CeComp/CeFlatList';
import RefNavigation from '../CeComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
} from '../CeRedux/CeActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../CeComp/CeHeader';
import {Button} from 'react-native-elements';

function CeHome(props) {
  useEffect(() => {
    fill_Popular_Arrival();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [mostPopular, setMostPopular] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const fill_Popular_Arrival = () => {
    let popularLamps = [];
    let newArrivals = [];
    let len = Data.product.length;
    for (let ce = 0; ce < 10; ce++) {
      popularLamps.push(Data.product[ce]);
    }
    for (let x = 0; x < 10; x++) {
      newArrivals.push(Data.product[len - 1]);
      len--;
    }
    setMostPopular(popularLamps);
    setNewArrival(newArrivals);
  };

  const CeGotoCart = () => RefNavigation.NavigateAndReset('CeCart');
  const CeGotoSearch = () => RefNavigation.Navigate('CeSearch');
  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    RefNavigation.NavigateAndReset('CeSP');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Feather}
            leftIconName="shopping-bag"
            leftIconColor="black"
            leftIconAction={CeGotoCart}
            rightIconAction={CeGotoSearch}
            rightIcon={Feather}
            rightIconColor="black"
            rightIconName="search"
            Title={
              <Ionicons
                color={'black'}
                size={H_W.width * 0.09}
                name="ios-ice-cream-outline"
              />
            }
            rightIconStyle={styles.CeHome_CE1}
          />
          <View style={{marginTop: HEIGHT * 0.02}}>
            <View style={styles.CeHome_CE2}>
              <View style={styles.CeHome_CE3}>
                <Text style={styles.CeHome_CE4}>Top Flavours</Text>
              </View>
              <TouchableOpacity onPress={CeGotoSearch}>
                <Text style={styles.CeHome_CE5}>View all</Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={mostPopular}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  CeGoToSingleProduct={CeGoToSingleProduct}
                />
              )}
            />
          </View>
          <View>
            <View style={styles.CeHome_CE6}>
              <View style={styles.CeHome_CE7}>
                <Text style={styles.CeHome_CE8}>New Flavours</Text>
              </View>
              <TouchableOpacity onPress={CeGotoSearch}>
                <Text style={styles.CeHome_CE9}>View all</Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={newArrival}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  CeGoToSingleProduct={CeGoToSingleProduct}
                />
              )}
            />
          </View>
        </ScrollView>
        <View
          style={{
            ...styles.CeHome_CE10,
            marginBottom: -insets.bottom,
            height: HEIGHT * 0.2,
          }}>
          <View>
            <Text style={styles.CeHome_CE11}>Total: ${props.CeTotal}</Text>
            <Button
              onPress={CeGotoCart}
              title="Order Now"
              raised
              titleStyle={styles.CeHome_CE12}
              buttonStyle={styles.CeHome_CE13}
              containerStyle={{marginTop: 8, width: '40%'}}
            />
          </View>
          <ImageBackground
            source={require('../CeAssets/ice22.png')}
            style={{
              ...styles.CeHome_CE14,
              height: HEIGHT * 0.3,
              top: -HEIGHT * 0.05,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </WrapperScreen>
  );
}

export const HorizontalList = ({item, CeGoToSingleProduct, cart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: cart ? 0 : 20,
      }}>
      <TouchableOpacity
        onPress={() => CeGoToSingleProduct(item)}
        style={styles.CeHome_CE16}>
        <View style={{...styles.CeHome_CE17, paddingBottom: HEIGHT * 0.02}}>
          <ImageBackground
            source={item.images}
            style={{...styles.CeHome_CE18, height: HEIGHT * 0.13}}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.CeHome_CE19}>{item.names}</Text>
          </View>
          {cart && (
            <Text style={{color: colors.darkGray, fontWeight: 'bold'}}>
              {item.flavor.topping}
            </Text>
          )}
          <View style={styles.CeHome_CE20}>
            <Text style={styles.CeHome_CE21}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CeHome_CE21: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  CeHome_CE20: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
  },
  CeHome_CE19: {
    fontSize: 19,
    color: colors.primary,
    fontWeight: 'bold',
    width: '100%',
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  CeHome_CE18: {
    width: H_W.width * 0.28,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginRight: -10,
  },
  CeHome_CE17: {
    backgroundColor: `rgba(${colors.rgb_Primary},0.3)`,
    paddingLeft: H_W.width * 0.06,

    width: H_W.width * 0.5,
    borderRadius: 50,
  },
  CeHome_CE16: {
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  CeHome_CE15: {},
  CeHome_CE14: {
    width: H_W.width * 0.4,

    position: 'absolute',
    right: 0,
  },
  CeHome_CE13: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  CeHome_CE12: {
    color: colors.primary,
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  CeHome_CE11: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  CeHome_CE10: {
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    backgroundColor: `rgba(${colors.rgb_Primary},1)`,
    position: 'relative',
    paddingHorizontal: H_W.width * 0.07,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderBottomColor: 'transparent',
  },
  CeHome_CE9: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  CeHome_CE8: {
    fontWeight: '500',
    fontSize: 27,
  },
  CeHome_CE7: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingLeft: H_W.width * 0.065,
    paddingRight: H_W.width * 0.02,
    elevation: 2,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  CeHome_CE6: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: H_W.width * 0.065,
  },
  CeHome_CE5: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  CeHome_CE4: {
    fontWeight: '500',
    fontSize: 27,
  },
  CeHome_CE3: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingLeft: H_W.width * 0.065,
    paddingRight: H_W.width * 0.02,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: colors.primary,
  },
  CeHome_CE2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: H_W.width * 0.065,
  },
  CeHome_CE1: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    CeTotal: state.CeCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {
  CesetCurrentProductAction,
  CeremoveFavAction,
  CesetFavAction,
})(CeHome);
