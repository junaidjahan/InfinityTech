import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Button} from 'react-native';
import LoginScreen from './src/screens/login-screen/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryScreen from './src/screens/category/CategoryScreen';
import LaptopProducts from './src/screens/product/laptop-products/LaptopProducts';
import MobileProducts from './src/screens/product/mobile-products/MobileProducts';
import Welcome from './src/screens/welcome-screen/Welcome';
import SignUpScreen from './src/screens/sign-up/SignUpScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoginWelcomeScreen from './src/screens/login-welcome/login-welcome-screen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import AllLaptopProducts from './src/screens/product/all-laptop-products/all-laptop-products';

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
    // signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

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

  // if (user) {
  //   return (
  //     <NavigationContainer>
  //       <Drawer.Navigator
  //         initialRouteName="LoginWelcomeScreen"
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //         drawerContent={(props) => {
  //           return (
  //             <DrawerContentScrollView {...props}>
  //               <DrawerItemList {...props} />
  //               <DrawerItem
  //                 label="Logout"
  //                 onPress={() => alert('Button clicked')}
  //               />
  //             </DrawerContentScrollView>
  //           );
  //         }}>
  //         <Drawer.Screen
  //           name="LoginWelcomeScreen"
  //           component={LoginWelcomeScreen}
  //           options={{title: 'Welcome'}}
  //         />
  //         <Drawer.Screen
  //           name="CategoryScreen"
  //           component={CategoryScreen}
  //           options={{title: 'Category'}}
  //         />
  //         <Drawer.Screen
  //           name="LaptopProducts"
  //           component={LaptopProducts}
  //           options={{title: 'Laptops'}}
  //         />
  //         <Drawer.Screen
  //           name="MobileProducts"
  //           component={MobileProducts}
  //           options={{title: 'Mobiles'}}
  //         />
  //         <Drawer.Screen
  //           name="AllLaptopProducts"
  //           component={AllLaptopProducts}
  //           options={{title: 'All Products'}}
  //         />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="CategoryScreen" component={CategoryScreen} />
          <Tab.Screen name="LaptopProducts" component={LaptopProducts} />
          <Tab.Screen name="AllLaptopProducts" component={AllLaptopProducts} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});
