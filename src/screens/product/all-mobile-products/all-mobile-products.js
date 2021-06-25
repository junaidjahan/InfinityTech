import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import ProductCard from '../../../components/card/product-card';
import {myname as myMobile} from '../../../components/listing-component/LaptopAppListing';
import colors from '../../../config/colors';
import firestore from '@react-native-firebase/firestore';

function AllMobileProducts(props) {
  let title = '' + myMobile;
  const [mobiles, setMobiles] = useState();

  useEffect(() => {
    const myData = async () => {
      const snapshot = await firestore().collection(myMobile).get();
      setMobiles(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
  }, []);

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={mobiles}
        keyExtractor={(laptops) => laptops.id}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            subtitle={item.price}
            image={item.image}
            onPress={() => {
              alert('You can not buy this at the moment.');
            }}
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

export default AllMobileProducts;
