import React from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import colors from '../../config/colors';
function Orders(props) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text style={{color: colors.darkgrey, fontSize: 20}}>
        {' '}
        No orders yet!
      </Text>
    </View>
  );
}

export default Orders;
