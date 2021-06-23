import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import ProductCard from '../../../components/card/product-card';
import {myname} from '../../../components/listing-component/AppListing';
import colors from '../../../config/colors';
import firestore from '@react-native-firebase/firestore';

function AllLaptopProducts(props) {
  let title = '' + myname;
  const [laptops, setLaptops] = useState();

  useEffect(() => {
    const myData = async () => {
      const snapshot = await firestore().collection('Acer').get();
      setLaptops(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
    console.log(laptops);
  }, []);

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={laptops}
        keyExtractor={(laptops) => laptops.id}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            subtitle={item.price}
            image={item.image}
          />
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

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.body,
    padding: 20,
  },
});

export default AllLaptopProducts;
