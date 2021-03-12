/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  CeremoveFavAction,
  CesetFavAction,
  CesetCurrentProductAction,
} from '../CeRedux/CeActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../CeComp/CeHeader';
import WrapperScreen from '../CeComp/WrapperScreen';
import NavigationRef from '../CeComp/RefNavigation';
import Loop from '../CeComp/CeFlatList';
import {FruityTiles} from './CeHome';
import {H_W} from '../CeComp/CeDim';
const CeFavourites = (props) => {
  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    NavigationRef.Navigate('CeSingleProduct');
  };

  const CeGoBack = () => NavigationRef.Navigate('CeHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={CeGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: H_W.width * 0.05,
          fontWeight: 'bold',
          marginTop: H_W.height * 0.08,
        }}>
        You have {props.CeFavs.length} Favourite items
      </Text>
      <ScrollView bounces={false}>
        <View style={styles.fav_SL1}>
          <Loop
            data={props.CeFavs}
            renderItem={({item}) => (
              <FruityTiles
                item={item}
                CeGoToSingleProduct={CeGoToSingleProduct}
                CeFavs={props.CeFavs}
                CeRemoveFavAct={(i) => props.CeremoveFavAction(i)}
                CeSetFavAct={(i) => props.CesetFavAction(i)}
              />
            )}
          />
        </View>
      </ScrollView>
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
    CeFavs: state.CeToggleFav,
  };
};

export default connect(mapStateToProps, {
  CesetFavAction,
  CesetCurrentProductAction,
  CeremoveFavAction,
})(CeFavourites);
