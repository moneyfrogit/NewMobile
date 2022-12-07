import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import NavigationService from './NavigationService';
import linking from '../services/Linking';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  WaveIndicator,
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
} from 'react-native-indicators';
import {AuthContext} from '../screens/AuthScreens/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawer from '../components/CustomDrawer';
import { Readers } from '../screens';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// const isLoggedIn = false;

function Routes() {
  // const [isLoading,setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const client = new ApolloClient({
    uri: 'https://blog.moneyfrog.in/graphql'
  });

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
        case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
     // console.log('sign in resp :', foundUser);
      const userToken = String(foundUser.login_token);
      const username = foundUser.email_id;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
     // console.log('sign in resp token :', userToken);
      //console.log('logging in :', username);
      dispatch({type: 'LOGIN', id: username, token: userToken});
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('sdsad');
      // setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
     userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
       // console.log('use effect token:', userToken);
      } catch (e) {
        console.log(e);
      }
       //setIsLoading(false);
      //console.log('user token :', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <BarIndicator color="#a7ce51" count={5} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={linking}
        // fallback={
        //   <View style={{flex: 1, justifyContent: 'center'}}>
        //     <BarIndicator color="#a7ce51" count={5} />
        //   </View>
        // }
        ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <ApolloProvider client={client}>
        {loginState.userToken != null ? <MainStack /> : <AuthStack />}

        {/* <AuthStack/> */} 
        {/* {isLoggedIn ? MainStack() : AuthStack()} */}
        </ApolloProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Routes;

//https://github.com/n4kz/react-native-indicators

// ERROR  TypeError: signIn is not a function. (In 'signIn(username, password)', 'signIn' is undefined)
// ERROR  TypeError: signIn is not a function. (In 'signIn(username, password)', 'signIn' is undefined)
// ERROR  TypeError: signIn is not a function. (In 'signIn(username, password)', 'signIn' is undefined)
// ERROR  TypeError: signIn is not a function. (In 'signIn(username, password)', 'signIn' is undefined)
// ERROR  ReferenceError: Can't find variable: userToken
// LOG  user token : dgsdgs
// LOG  user token : dgsdgs

// signIn: (userName, password) => {
//   // setUserToken('sdsad');
//   // setIsLoading(false);
//   let userToken;
//   userName = null;
//   if (userName == 'user' && password == 'pass') {
//     userToken = 'ndsjnjdsn';
//   }
//   console.log('user token :', userToken);
//   dispatch({type: 'LOGIN', id: userName, token: userToken});
// },
// signOut: () => {
//   // setUserToken(null);
//   // setIsLoading(false);
//   dispatch({type: 'LOGOUT'});

// },
// signUp: () => {
//   setUserToken('sdsad');
//   setIsLoading(false);
// },
