import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import colors from '../../config/colors';

function ProductCard({title, subtitle, image}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={{width: '100%', height: 200}} />
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
});

export default ProductCard;
