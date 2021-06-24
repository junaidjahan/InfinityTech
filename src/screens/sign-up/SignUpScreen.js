import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import colors from '../../config/colors';
import BaseText from '../../components/base-text/BaseText.';
import APPButton from '../../components/button/APPButton';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';

function SignUpScreen(props) {
  const [UserName, setUserName] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  useEffect(() => {});
  const signup = () => {
    
    var count = ''+this.state.data.length;
    
    if (Email === undefined) {
      alert('Email is required');
    } else if (Password === undefined) {
      alert('Password is required');
    } else if (UserName === undefined) {
      alert('User Name is required');
    } else if (PhoneNumber === undefined) {
      alert('Phone Number is required');
    }else {
      firestore()
      .collection('users')
      .doc(count)
      .set({
        UserName: UserName,
        Pone: PhoneNumber,
        key: count,
      })
      .then(() => {
        console.log('User added!');
      }).then(() => {
        auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          } else {
            alert(error);
          }
        });});
      
    }
  };
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.mainView}>
        <Image
          style={styles.logo}
          source={require('../../res/infinitylogo.png')}
        />
        <BaseText
          icon="account-circle"
          placeholder="User Name"
          onChangeText={(userName) => setUserName(userName)}
        />
        <BaseText
          icon="phone"
          placeholder="Phone Number"
          onChangeText={(number) => {
            setPhoneNumber(number);
          }}
        />
        <BaseText
          icon="email"
          placeholder="Email"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <BaseText
          icon="lock"
          placeholder="Passsword"
          secureTextEntry={true}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
        <APPButton
          title="SignUp"
          backgroundColor={colors.primary}
          width={'90%'}
          onPress={() => {
            signup();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.body,
  },

  logo: {
    width: 230,
    height: 230,
    alignSelf: 'center',
  },

  mainView: {
    alignItems: 'center',
  },

  btn: {
    width: '100%',
  },
});
export default SignUpScreen;
