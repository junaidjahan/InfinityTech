import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AppListing from '../../../components/listing-component/AppListing';
import colors from '../../../config/colors';

const messages = [
  {
    id: '1',
    title: 'Samsung Galaxy',
  },
  {
    id: '2',
    title: 'Oppo',
  },
  {
    id: '3',
    title: 'iPhone',
  },
  {
    id: '4',
    title: 'Google Pixel',
  },
  {
    id: '5',
    title: 'XIOMI',
  },
  {
    id: '6',
    title: 'Huawei',
  },
  {
    id: '7',
    title: 'Poco Phone',
  },
  {
    id: '8',
    title: 'Vivo',
  },
  {
    id: '9',
    title: 'Qmobile',
  },
  {
    id: '10',
    title: 'BlackBerry',
  },
];

function MobileProducts(props) {
  return (
    <View style={style.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({item}) => (
          <AppListing title={item.title} icon="cellphone-iphone" />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 5,
              backgroundColor: colors.body,
            }}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MobileProducts;
