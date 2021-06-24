import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function LoginWelcomeScreen(props) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(user);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <View style={styles.mainView}>
      <MaterialCommunityIcons
        name="account-tie"
        size={150}
        style={styles.icon}
        color={colors.primary}
      />
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={styles.userText}>{user.email} </Text>
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
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: -20,
  },
  userText: {
    color: colors.darkgrey,
    fontWeight: 'bold',
    fontSize: 30,
  },
});
export default LoginWelcomeScreen;
