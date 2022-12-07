/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
//AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
  ]);

  // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);

//first of all, your "setBackgroundMessageHandler" should be located in your index.js like mentioned in the react-native-firebase docs. You should take another look at that. Now to your question: You want to process data from a fcmNotification that was sent while your app is in background or quit state. Your setBackgroundMessageHandler is not allowed to update any UI (e.g. via state , like mentioned in the docs). However it can perform network requests or update the localStorage. And this is what you should be doing. When a message arrives trough the backgroundHandler, update your LocalStorage. On the next start of your app, you can check if the LocalStorage contains data from a message the backgroundHander processed. If yes, do something with it and delete it after so the next App start wont trigger an action with the old data. If no, -well- do nothing.