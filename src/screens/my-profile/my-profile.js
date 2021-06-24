import {View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function MyProfile(props) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [star, setStar] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    const myData = async () => {
      await firestore()
        .collection('users')
        .doc(user.email)
        .get()
        .then((snapShot) => {
          setStar(snapShot.data());
        })
        .catch(() => {
          console.log('something went wrong');
        });
      // setData(snapshot.docs.map((doc) => doc.data()));
    };

    myData();

    return subscriber; // unsubscribe on unmount
  });

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  if (initializing) return null;
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="account-tie"
          size={150}
          style={styles.icon}
          color={colors.white}
        />
        <Text style={styles.title}>Name</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{star.UserName}</Text>
        </View>
        <Text style={styles.title}>Phone Number</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{star.Phone}</Text>
        </View>
        <Text style={styles.title}>Email</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{star.Email}</Text>
        </View>
      </View>
      <TouchableHighlight
        onPress={() => {
          signOut();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    top: 20,
  },
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    overflow: 'hidden',
    width: 350,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
    marginTop: 5,
  },

  icon: {
    alignSelf: 'center',
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 300,
    height: 40,
    top: 5,
    justifyContent: 'center',
  },

  data: {
    left: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    width: 350,
    top: 20,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default MyProfile;