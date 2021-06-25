import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function LoginWelcomeScreen(props) {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          const snapshot = await firestore()
            .collection('users')
            .doc(user.email)
            .get();

          setUser(snapshot.data());
        })();
      } else {
        alert('user is signed out');
      }
    });

    (async () => {
      const image = await firestore()
        .collection('Vector image')
        .doc('image')
        .get();
      setImage(image.data());
    })();

    return subscriber; // unsubscribe on unmount
  }, [user]);

  return (
    <View style={styles.mainView}>
      {/* <MaterialCommunityIcons
        name="account-tie"
        size={150}
        style={styles.icon}
        color={colors.primary}
      /> */}
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={styles.userText}>{user.UserName} </Text>
      <Image
        source={require('../../res/Vector1.png')}
        style={{width: '100%', height: 500}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.body,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.darkgrey,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: -20,
  },
  userText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 40,
  },
});
export default LoginWelcomeScreen;
