import React from 'react';

export const AuthContext = React.createContext();




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useContext,
//   Children,
// } from 'react';
// import {BASE_URL} from '../../API/config';

// export const AuthContext = createContext();

// export const AuthProvider = ({Children}) => {

//   const check_if_exists = () => {
    
//   }

//   const login = (   
//     email,
//     password) => {
//       axios.post(`${BASE_URL}/validation_login`, {
//         email,
//         password
//       })
//       .then(res => {
//         let token = res.data;
//         setToken(token);
//         AsyncStorage.setItem('userInfo', JSON.stringify(token));
//         setIsLoading(false);
//         console.log(token);
//       })
//       .catch(e => {
//         console.log(`Error while registering... ${e}`);
//       });

//   }

//   const register = (
//     name,
//     email,
//     contact_number,
//     city,
//     password,
//     captcha,
//     registered_thru,
//   ) => {
//     axios
//       .post(`${BASE_URL}/api_sign_up`, {
//         name,
//         email,
//         password,
//         contact_number,
//         city,
//         captcha,
//         registered_thru,
//       })
//       .then(res => {
//         let userInfo = res.data;
//         setUserInfo(userInfo);
//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         setIsLoading(false);
//         console.log(userInfo);
//       })
//       .catch(e => {
//         console.log(`Error while registering... ${e}`);
//       });
//   };

//   return (
//     <AuthContext.Provider val="test">{Children}</AuthContext.Provider>
//   );
// };
