import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import Database from '../utils/Database';

const db = new Database();

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}


const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('The Old FCM Token', fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('The New Generated FCM Token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Error raised in fcmToken', error);
    //   showError(error.message);
    }
  }
};

export const notificationListener = async() =>{

  saveProduct = async (title,message) => {
    console.log('save');
    let data = {
      title: title,
      message: message,
      data:"",
      data1:"",
      data2:""
    }
    db.addProduct(data).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    })
  }

    messaging().onNotificationOpenedApp(remoteMessage => {
      saveProduct(remoteMessage.notification.title,remoteMessage.notification.body,remoteMessage.notification.smallIcon)
      console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification
        );
        //navigation.navigate(remoteMessage.data.type);
          console.log("backgrund state",remoteMessage.notification)  
      });

      messaging().onMessage(async remoteMessage => {
        //saveProduct(remoteMessage.notification)
        saveProduct(remoteMessage.notification.title,remoteMessage.notification.body,remoteMessage.notification.smallIcon)
        console.log('Notification Received in Foreground', remoteMessage.notification);
      })
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          saveProduct(remoteMessage.notification.title,remoteMessage.notification.body,remoteMessage.notification.smallIcon)
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification
            );
            //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            console.log("remote message",remoteMessage.notification)  
          }
        })
}
