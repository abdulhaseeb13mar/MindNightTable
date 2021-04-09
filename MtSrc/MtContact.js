/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../MtComp/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {H_W} from '../MtComp/MtDim';
import {colors} from '../MtComp/MtColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../MtComp/validation';
import NavPointer from '../MtComp/RefNavigation';
import {MtUserAction, MtresetCart} from '../MtRedux/MtActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../MtComp/MtHeader';
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
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const MtProduct = props.MtProduct;

  const Confirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 2000);
      props.MtUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
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
            email: email,
            appname: 'MindNight Table',
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
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setAddressErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
    } else if (errCategory === 'phone') {
      setAddressErrMsg('');
      setEmailErrMsg('');
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
    } else if (errCategory === 'address') {
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg(errMsg);
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.MtresetCart();
    NavPointer.Push('MtHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
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
        <View
          style={{
            marginBottom: H_W.height * 0.01,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              borderColor: colors.primary,
              borderWidth: 2,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 10,
              padding: 10,
              marginVertical: HEIGHT * 0.01,
              backgroundColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}>
            <ImageBackground
              source={MtProduct.images}
              style={{
                width: H_W.width * 0.3,
                height: H_W.width * 0.35,
              }}
              imageStyle={{borderRadius: 10}}
              resizeMode="contain"
            />
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: H_W.width * 0.06,
                position: 'relative',
              }}>
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 18,
                  fontWeight: 'bold',
                  width: H_W.width * 0.35,
                }}>
                {MtProduct.productName}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  width: H_W.width * 0.35,
                }}>
                <Text
                  style={{
                    color: colors.lightGrey3,
                    fontSize: 15,
                    fontWeight: '700',
                  }}>
                  ${parseFloat(MtProduct.price) * MtProduct.added}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: HEIGHT * 0.01,
                }}>
                Extras:{' '}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: HEIGHT * 0.01,
                }}>
                {MtProduct.extras.map((item) => `${item} `)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.MtPersonalInfoWrapper}>
          <Text style={styles.MtPersonalInfoHeader}>Personal Information</Text>
        </View>
        <View style={styles.MtPersonalInfoWrapper}>
          <View style={styles.MtSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.MtPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.MtPersonalInfoInputWrapper}>
              <Feather
                name="user"
                size={H_W.width * 0.07}
                style={styles.MtInputIcon}
              />
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.MtSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.MtPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.MtPersonalInfoInputWrapper}>
              <Feather
                name="mail"
                size={H_W.width * 0.07}
                style={styles.MtInputIcon}
              />
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.MtSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.MtPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.MtPersonalInfoInputWrapper}>
              <Feather
                name="phone"
                size={H_W.width * 0.07}
                style={styles.MtInputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.MtSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.MtPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.MtPersonalInfoInputWrapper}>
              <Feather
                name="map-pin"
                size={H_W.width * 0.07}
                style={styles.MtInputIcon}
              />
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.MtConfirmButtonWrapper,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Button
            title="CONFIRM ORDER"
            raised
            containerStyle={styles.MtConfirmButtonContainer}
            buttonStyle={{
              ...styles.MtConfirmButton,
              padding: HEIGHT * 0.018,
            }}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
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
              ...styles.MtModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <FontAwesome5
              name="pizza-slice"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.MtModalHeadText}>THANK YOU!</Text>
            <Text style={styles.MtModalSubText}>
              You will recieve your order soon
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    MtProduct: state.MtCrntPrdtReducer,
    total: state.MtCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {MtUserAction, MtresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  MtSm4: {fontSize: H_W.width * 0.03, fontWeight: 'bold'},
  MtSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MtSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MtSm1: {
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
  MtSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MtModalSubText: {
    fontSize: H_W.width * 0.045,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  MtModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  MtModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  MtConfirmButtonContainer: {
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
  MtConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  MtConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
  },
  MtInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.primary,
  },
  MtPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  MtPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  MtSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  MtPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  MtPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
