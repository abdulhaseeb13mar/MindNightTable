/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../CeComp/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {H_W} from '../CeComp/CeDim';
import {colors} from '../CeComp/CeColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../CeComp/validation';
import NavPointer from '../CeComp/RefNavigation';
import {CeUserAction, CeresetCart} from '../CeRedux/CeActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../CeComp/CeHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const Confirm = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.CeUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
        lastName: lastName,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            lastname: lastName,
            email: email,
            appname: 'Creamery Express',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setLastNameErrMsg(errMsg);
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setLastNameErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.CeresetCart();
    NavPointer.Push('CeHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeLastName = (t) => setLastName(t);
  const changeEmail = (t) => setEmail(t);
  const goBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          Title="Checkout"
          leftIconAction={goBack}
          titleStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
          leftIconStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
        />
        <View style={{...styles.CeSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.CeSm1}>
            <View style={styles.CeSm2}>
              <Text>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>${props.total}</Text>
            </View>
            <View style={styles.CeSm3}>
              <Text style={styles.CeSm4}>Payment Mode:</Text>
              <Text style={styles.CeSm4}>Payment on delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.CePersonalInfoWrapper}>
          <Text style={styles.CePersonalInfoHeader}>Personal Information</Text>
        </View>
        <View style={styles.CePersonalInfoWrapper}>
          <View style={styles.CeSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CePersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.CePersonalInfoInputWrapper}>
              <TextInput
                placeholder="First Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
              />
              <Feather
                name="user"
                size={H_W.width * 0.07}
                style={styles.CeInputIcon}
              />
            </View>
          </View>
          <View style={styles.CeSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CePersonalInfoHeadingName,
                color: lastNameErrMsg ? 'red' : 'black',
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.CePersonalInfoInputWrapper}>
              <TextInput
                placeholder="Last Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeLastName}
              />
              <Feather
                name="user"
                size={H_W.width * 0.07}
                style={styles.CeInputIcon}
              />
            </View>
          </View>
          <View style={styles.CeSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CePersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.CePersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
              />
              <Feather
                name="mail"
                size={H_W.width * 0.07}
                style={styles.CeInputIcon}
              />
            </View>
          </View>
          <View style={styles.CeSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CePersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.CePersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
              />
              <Feather
                name="phone"
                size={H_W.width * 0.07}
                style={styles.CeInputIcon}
              />
            </View>
          </View>
          <View style={styles.CeSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CePersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.CePersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
              />
              <Feather
                name="map-pin"
                size={H_W.width * 0.07}
                style={styles.CeInputIcon}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.CeConfirmButtonWrapper,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Button
            title="CONFIRM ORDER"
            raised
            containerStyle={styles.CeConfirmButtonContainer}
            buttonStyle={{
              ...styles.CeConfirmButton,
              padding: HEIGHT * 0.018,
            }}
            titleStyle={{color: 'black', fontWeight: 'bold'}}
            loadingProps={{color: 'black'}}
            loading={loading}
            onPress={Confirm}
          />
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.CeModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <Ionicons
              name="ios-ice-cream-sharp"
              size={H_W.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.CeModalHeadText}>THANK YOU!</Text>
            <Text style={styles.CeModalSubText}>
              You will recieve your ice cream shortly!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.CeCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {CeUserAction, CeresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  CeSm4: {fontSize: H_W.width * 0.03, fontWeight: 'bold'},
  CeSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CeSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CeSm1: {
    width: '75%',
    backgroundColor: colors.secondary,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: H_W.width * 0.04,
  },
  CeSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CeModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CeModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CeModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
  },
  CeConfirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  CeConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  CeConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
  },
  CeInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.primary,
  },
  CePersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  CePersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  CeSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  CePersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  CePersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
