/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../CeComp/WrapperScreen';
import {H_W} from '../CeComp/CeDim';
import NavigationRef from '../CeComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../CeComp/CeSearchBar';
import Data from '../CeData';
import {HorizontalList} from './CeHome';
import {connect} from 'react-redux';
import {CesetCurrentProductAction} from '../CeRedux/CeActions';
import UseHeader from '../CeComp/CeHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.names.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const CeGoToSingleProduct = (item) => {
    props.CesetCurrentProductAction(item);
    NavigationRef.Navigate('CeSP');
  };

  const CardRender = (Arr) => {
    return Arr.map((item, index) => (
      <View
        key={index}
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <HorizontalList item={item} CeGoToSingleProduct={CeGoToSingleProduct} />
      </View>
    ));
  };
  const CeGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="All Ice Creams"
        leftIconAction={CeGoBack}
        titleStyle={styles.TextShadow}
        leftIconStyle={styles.TextShadow}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginTop: H_W.height * 0.03}}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  CeFavs: state.CeToggleFav,
});

export default connect(mapStateToProps, {
  CesetCurrentProductAction,
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
