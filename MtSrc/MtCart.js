/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {
  MtremoveCartAction,
  MtaddCartAction,
  MtsetCurrentProductAction,
} from '../MtRedux/MtActions';
import WrapperScreen from '../MtComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../MtComp/MtColor';
import {H_W} from '../MtComp/MtDim';
import RefNavigation from '../MtComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import MyHeader from '../MtComp/MtHeader';
import {HorizontalList} from './MtHome';
import MtItemCounterWrapper from '../MtComp/MtItemCounterWrapper';

export const Cart = (props) => {
  const insets = useSafeAreaInsets();
  const MtCartArray = Object.keys(props.MtCart);
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const goBack = () => RefNavigation.Navigate('MtHome');

  const MtGoToSingleProduct = (item) => {
    props.MtsetCurrentProductAction(item);
    RefNavigation.Navigate('MtSP');
  };

  const MtinfoScreen = () => RefNavigation.Navigate('MtContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Entypo}
            leftIconName="chevron-left"
            leftIconAction={goBack}
            Title="Cart"
            leftIconStyle={styles.cart_CE1}
            titleStyle={styles.cart_CE1}
          />
          <View>
            {MtCartArray.length > 0 ? (
              MtCartArray.map((id, index) => {
                const item = props.MtCart[id];
                return (
                  <View key={index} style={styles.cart_CE2}>
                    <MtItemCounterWrapper
                      position="left"
                      Counterlength={HEIGHT * 0.11}
                      style={{margin: 17}}
                      item={item}
                      MtGoToSingleProduct={MtGoToSingleProduct}>
                      <HorizontalList
                        item={item}
                        MtGoToSingleProduct={MtGoToSingleProduct}
                        cart={true}
                      />
                    </MtItemCounterWrapper>
                  </View>
                );
              })
            ) : (
              <Text style={styles.cart_CE3}>Your Cart is empty...</Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            ...styles.cart_CE4,
            marginBottom: -insets.bottom,
            height: HEIGHT * 0.2,
          }}>
          <View>
            <Text style={styles.cart_CE5}>Total: ${props.MtTotal}</Text>
            <Button
              onPress={MtinfoScreen}
              title="Checkout"
              disabled={props.MtTotal < 1}
              raised
              titleStyle={styles.cart_CE6}
              buttonStyle={styles.cart_CE7}
              containerStyle={{marginTop: 8, width: '40%'}}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  cart_CE8: {
    width: H_W.width * 0.4,
    position: 'absolute',
    right: 0,
  },
  cart_CE7: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cart_CE6: {
    color: colors.primary,
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  cart_CE5: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cart_CE4: {
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
  cart_CE3: {
    width: '100%',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  cart_CE2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart_CE1: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

const mapStateToProps = (state) => ({
  MtCart: state.MtCartReducer.items,
  MtTotal: state.MtCartReducer.totalAmount,
});

export default connect(mapStateToProps, {
  MtremoveCartAction,
  MtaddCartAction,
  MtsetCurrentProductAction,
})(Cart);
