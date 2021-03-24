/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../MtComp/WrapperScreen';
import {H_W} from '../MtComp/MtDim';
import NavigationRef from '../MtComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../MtComp/MtSearchBar';
import Data from '../MTData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductList} from './MtHome';
import {connect} from 'react-redux';
import {
  MtsetCurrentProductAction,
  MtremoveFavAction,
  MtsetFavAction,
} from '../MtRedux/MtActions';
import Loop from '../MtComp/MtFlatList';
import UseHeader from '../MtComp/MtHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const RenderSearchedResult = () => {
    var SearchedItems = Data.products.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const MtGoToSingleProduct = (item) => {
    props.MtsetCurrentProductAction(item);
    NavigationRef.Navigate('MtSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
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
    );
  };
  const MtGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="Search"
        leftIconAction={MtGoBack}
        titleStyle={styles.TextShadow}
        leftIconStyle={styles.TextShadow}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <View style={{marginTop: H_W.height * 0.03, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.products)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  MtFavs: state.MtToggleFav,
});

export default connect(mapStateToProps, {
  MtsetCurrentProductAction,
  MtremoveFavAction,
  MtsetFavAction,
})(Search);

const styles = StyleSheet.create({
  TextShadow: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: H_W.height * 0.003,
  },
  container: {flex: 1},
});
