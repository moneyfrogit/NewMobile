import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS} from '../../../constants/theme';
import styles from './Styles';
import navigationStrings from '../../../constants/navigationStrings';

const UserProfile = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {dataa, loading} = state;

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      setState({dataa: [], loading: true});
      const URL =
        'http://api.moneyfrog.in/transactions/api/profile/overview/' + userID;
      axios
        .get(URL)
        .then(response => response.data)
        .then(dataa => {
          console.log('Profile Overview Data', dataa);
          setState({dataa, loading: false}); // set only data
        })
        .catch(function (error) {
          // handle error
          console.log('Profile Overview error', error);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent text="Profile" goBack={() => navigation.goBack()} />
      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
            }}>
            <Image
              source={require('../../../assets/Images/ProfileBg/profile_bg1.png')}
              style={{}}
            />
          </View>

          <View
            style={{
              opacity: 0.5,
              margin: 10,
            }}>
            <Image
              source={{
                uri: 'https://moneyfrog.in/images/profile_img.gif',
              }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 100,
          }}>
          <ScrollView style={{margin: 5}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.PERSONALDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Personal Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.SPOUSEDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Spouse Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.FATHERDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Father Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.MOTHERDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Mother Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.KIDSDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Kid's Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.SIBLINGSDETAILS);
              }}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: COLORS.lightGrey2,
                  height: 40,
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Sibling's Details
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
