import {FlatList, Text, View, StyleSheet} from 'react-native';
import MobileAppListing from '../../../components/listing-component/LaptopAppListing';
import colors from '../../../config/colors';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

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
  const [mobiles, setMobiles] = useState();

  useEffect(() => {
    const myData = async () => {
      const snapshot = await firestore().collection('Mobile').get();
      setMobiles(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
  }, []);

  return (
    <View style={style.container}>
      <FlatList
        data={mobiles}
        keyExtractor={(message) => message.id}
        renderItem={({item}) => (
          <MobileAppListing title={item.title} icon="cellphone-iphone" />
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
