import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import AppListing from './src/components/listing-component/AppListing';
import LoginScreen from './src/screens/login-screen/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import CategoryScreen from './src/screens/category/CategoryScreen';
import LaptopProducts from './src/screens/product/laptop-products/LaptopProducts';
import MobileProducts from './src/screens/product/mobile-products/MobileProducts';
import Welcome from './src/screens/welcome-screen/Welcome';
import SignUpScreen from './src/screens/sign-up/SignUpScreen';
import * as firebase from 'firebase';
import {firebaseConfig} from './config';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// firebase.default.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="LaptopProducts" component={LaptopProducts} />
          <Stack.Screen name="MobileProducts" component={MobileProducts} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});
