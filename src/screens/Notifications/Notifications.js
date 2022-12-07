import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import {COLORS} from '../../constants/theme';
import Database from '../../utils/Database';
import {notificationListener} from '../../utils/NotificationService';
import {openDatabase} from 'react-native-sqlite-storage';
import imagePath from '../../constants/imagePath';
import {List} from 'react-native-paper';


const db = new Database();

const Notifications = () => {
  const [notif, setNotif] = useState('');

  const getProducts = () => {
    let products = [];
    db.listProduct()
      .then(data => {
        products = data;
        setNotif(data);
        console.log('listing notification data from database 123234', products);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderNotifications = ({item, index}) => (
    <View
      style={{
        backgroundColor: COLORS.main,
        marginHorizontal: 5,
        margin: 8,
        height: 120,
        borderRadius: 10,
      }}>
        <View>
        <Text
        style={{
          color: COLORS.black,
          fontWeight: 'bold',
          fontSize: 14,
          margin: 8,
        }}>
        {item.prodId}
      </Text>
        </View>

      <Text style={{color: COLORS.black, fontSize:12}}>{item.prodName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent text="Alerts" />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: COLORS.black, fontWeight: 'bold', fontSize: 18}}>
          Notification will be shown here!
        </Text>


      </View>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={notif}
          renderItem={renderNotifications}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
