/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  MtremoveFavAction,
  MtsetFavAction,
  MtsetCurrentProductAction,
} from '../MtRedux/MtActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../MtComp/MtHeader';
import WrapperScreen from '../MtComp/WrapperScreen';
import NavigationRef from '../MtComp/RefNavigation';
import Loop from '../MtComp/MtFlatList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductList} from './MtHome';
import {H_W} from '../MtComp/MtDim';
const MtFavourites = (props) => {
  const MtGoToSingleProduct = (item) => {
    props.MtsetCurrentProductAction(item);
    NavigationRef.Navigate('MtSP');
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const MtGoBack = () => NavigationRef.Navigate('MtHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={MtGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: H_W.width * 0.05,
          fontWeight: 'bold',
          // marginTop: H_W.height * 0.08,
        }}>
        You have {props.MtFavs.length} Favourite items
      </Text>
      {/* <ScrollView bounces={false}> */}
      <View style={styles.fav_SL1}>
        <Loop
          horizontal={false}
          data={props.MtFavs}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: HEIGHT * 0.015,
              }}>
              <ProductList
                item={item}
                navigatetoSP={MtGoToSingleProduct}
                MtFavs={props.MtFavs}
                MtRemoveFavAct={(i) => props.MtremoveFavAction(i)}
                MtSetFavAct={(i) => props.MtsetFavAction(i)}
              />
            </View>
          )}
        />
      </View>
      {/* </ScrollView> */}
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  fav_SL2: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fav_SL1: {
    flex: 1,
    paddingLeft: H_W.width * 0.027,
    paddingTop: H_W.height * 0.025,
  },
});

const mapStateToProps = (state) => {
  return {
    MtFavs: state.MtToggleFav,
  };
};

export default connect(mapStateToProps, {
  MtsetFavAction,
  MtsetCurrentProductAction,
  MtremoveFavAction,
})(MtFavourites);
