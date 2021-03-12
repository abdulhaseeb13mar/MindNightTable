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
import WrapperScreen from '../MtComp/WrapperScreen';
import {colors} from '../MtComp/MtColor';
import {H_W} from '../MtComp/MtDim';
import Data from '../MtData';
import Loop from '../MtComp/MtFlatList';
import RefNavigation from '../MtComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  MtsetCurrentProductAction,
  MtremoveFavAction,
  MtsetFavAction,
} from '../MtRedux/MtActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../MtComp/MtHeader';
import {Button} from 'react-native-elements';

function MtHome(props) {
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

  const MtGotoCart = () => RefNavigation.NavigateAndReset('MtCart');
  const MtGotoSearch = () => RefNavigation.Navigate('MtSearch');
  const MtGoToSingleProduct = (item) => {
    props.MtsetCurrentProductAction(item);
    RefNavigation.NavigateAndReset('MtSP');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Feather}
            leftIconName="shopping-bag"
            leftIconColor="black"
            leftIconAction={MtGotoCart}
            rightIconAction={MtGotoSearch}
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
            rightIconStyle={styles.MtHome_CE1}
          />
          <View style={{marginTop: HEIGHT * 0.02}}>
            <View style={styles.MtHome_CE2}>
              <View style={styles.MtHome_CE3}>
                <Text style={styles.MtHome_CE4}>Top Flavours</Text>
              </View>
              <TouchableOpacity onPress={MtGotoSearch}>
                <Text style={styles.MtHome_CE5}>View all</Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={mostPopular}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  MtGoToSingleProduct={MtGoToSingleProduct}
                />
              )}
            />
          </View>
          <View>
            <View style={styles.MtHome_CE6}>
              <View style={styles.MtHome_CE7}>
                <Text style={styles.MtHome_CE8}>New Flavours</Text>
              </View>
              <TouchableOpacity onPress={MtGotoSearch}>
                <Text style={styles.MtHome_CE9}>View all</Text>
              </TouchableOpacity>
            </View>
            <Loop
              data={newArrival}
              renderItem={({item}) => (
                <HorizontalList
                  item={item}
                  MtGoToSingleProduct={MtGoToSingleProduct}
                />
              )}
            />
          </View>
        </ScrollView>
        <View
          style={{
            ...styles.MtHome_CE10,
            marginBottom: -insets.bottom,
            height: HEIGHT * 0.2,
          }}>
          <View>
            <Text style={styles.MtHome_CE11}>Total: ${props.MtTotal}</Text>
            <Button
              onPress={MtGotoCart}
              title="Order Now"
              raised
              titleStyle={styles.MtHome_CE12}
              buttonStyle={styles.MtHome_CE13}
              containerStyle={{marginTop: 8, width: '40%'}}
            />
          </View>
          <ImageBackground
            source={require('../MtAssets/ice22.png')}
            style={{
              ...styles.MtHome_CE14,
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

export const HorizontalList = ({item, MtGoToSingleProduct, cart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: cart ? 0 : 20,
      }}>
      <TouchableOpacity
        onPress={() => MtGoToSingleProduct(item)}
        style={styles.MtHome_CE16}>
        <View style={{...styles.MtHome_CE17, paddingBottom: HEIGHT * 0.02}}>
          <ImageBackground
            source={item.images}
            style={{...styles.MtHome_CE18, height: HEIGHT * 0.13}}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.MtHome_CE19}>{item.names}</Text>
          </View>
          {cart && (
            <Text style={{color: colors.darkGray, fontWeight: 'bold'}}>
              {item.flavor.topping}
            </Text>
          )}
          <View style={styles.MtHome_CE20}>
            <Text style={styles.MtHome_CE21}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MtHome_CE21: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  MtHome_CE20: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
  },
  MtHome_CE19: {
    fontSize: 19,
    color: colors.primary,
    fontWeight: 'bold',
    width: '100%',
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  MtHome_CE18: {
    width: H_W.width * 0.28,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginRight: -10,
  },
  MtHome_CE17: {
    backgroundColor: `rgba(${colors.rgb_Primary},0.3)`,
    paddingLeft: H_W.width * 0.06,

    width: H_W.width * 0.5,
    borderRadius: 50,
  },
  MtHome_CE16: {
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
  MtHome_CE15: {},
  MtHome_CE14: {
    width: H_W.width * 0.4,

    position: 'absolute',
    right: 0,
  },
  MtHome_CE13: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  MtHome_CE12: {
    color: colors.primary,
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  MtHome_CE11: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  MtHome_CE10: {
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
  MtHome_CE9: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  MtHome_CE8: {
    fontWeight: '500',
    fontSize: 27,
  },
  MtHome_CE7: {
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
  MtHome_CE6: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: H_W.width * 0.065,
  },
  MtHome_CE5: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  MtHome_CE4: {
    fontWeight: '500',
    fontSize: 27,
  },
  MtHome_CE3: {
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
  MtHome_CE2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: H_W.width * 0.065,
  },
  MtHome_CE1: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    MtTotal: state.MtCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {
  MtsetCurrentProductAction,
  MtremoveFavAction,
  MtsetFavAction,
})(MtHome);
