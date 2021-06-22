import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AppListing from '../../../components/listing-component/AppListing';
import colors from '../../../config/colors';

const messages = [
  {
    id: '1',
    title: 'Asus',
  },
  {
    id: '2',
    title: 'Dell ',
  },
  {
    id: '3',
    title: 'HP',
  },
  {
    id: '4',
    title: 'MSI',
  },
  {
    id: '5',
    title: 'Lenovo',
  },
  {
    id: '6',
    title: 'Acer',
  },
  {
    id: '7',
    title: 'Razer',
  },
  {
    id: '8',
    title: 'Samsung ',
  },
  {
    id: '9',
    title: 'Huawei',
  },
  {
    id: '10',
    title: 'Apple',
  },
];

function LaptopProducts(props) {
  return (
    <View style={style.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({item}) => (
          <AppListing title={item.title} icon="laptop-mac" />
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

export default LaptopProducts;
