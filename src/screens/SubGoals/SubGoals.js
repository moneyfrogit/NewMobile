import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import ButtonComponent from '../../components/ButtonComponent';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import RenderTitle from '../../components/RenderTitle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import imagePath from '../../constants/imagePath';
import {Button, Divider} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {amountToText} from '../../utils/Amounts';
import {
  BarIndicator,
  BallIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const SubGoals = ({navigation, route}) => {
  const {data, key} = route.params;
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [subGoals, setSubGoals] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState();
  const [modalInfo, setModalInfo] = React.useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [showMoreToggle, setShowMoreToggle] = React.useState(false);
  const subGoalsHeightAnimationValue = useRef(new Animated.Value(115)).current;
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async encoded => {
    const userID = await AsyncStorage.getItem('userId');
    setUserID(userID);
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken);
    // start refreshing
    // generate goals API url
    // console.warn(key)
    // const uri = key;
    // const encoded = encodeURI(uri);
    // console.log('encoded', encoded);
    setIsLoading(true);
    try {
      const mainGoalsApiUrl =
        'https://moneyfrog.in/home/mobile_api_goals/' +
        userID +
        '/mobile-api-goals?login_token=' +
        userToken +
        '&mobile_section=goals_section&parent_key=' +
        encoded;
      //console.log('SubGoalUrl :- ', mainGoalsApiUrl);

      // call goals API
      const result = await axios.get(mainGoalsApiUrl).then(res => {
        const result = res.data.Response;
        console.log('subGoals', result);
        setSubGoals(result);
        setIsLoading(false);
        // if (result.Message === 'Invalid Login Token') {
        //   console.log('goalsData error');
        //   // logout();
        // } else {
        //   const goalsData = result.Response;
        //   console.log(goalsData);
        //   //setSubGoals(goalsData);
        // }
      });
      //console.log(decodeURI(encoded));
      // expected output: "https://mozilla.org/?x=шеллы"
    } catch (e) {
      // catches a malformed URI
      console.error(e);
    }
  };

  // goal icons declaration
  const car = require('../../assets/Images/Goals/car.png');
  const contingencyFund = require('../../assets/Images/Goals/contigency-fund.png');
  const house = require('../../assets/Images/Goals/house.png');
  const kidsEducation = require('../../assets/Images/Goals/kids-education.png');
  const loanPayoff = require('../../assets/Images/Goals/loan-payoff.png');
  const marriage = require('../../assets/Images/Goals/marriage.png');
  const medicalCorpus = require('../../assets/Images/Goals/medical-corpus.png');
  const others = require('../../assets/Images/Goals/others.png');
  const retirement = require('../../assets/Images/Goals/retirement.png');
  const sabbatical = require('../../assets/Images/Goals/sabbatical.png');
  const vacationTrip = require('../../assets/Images/Goals/vacation-trip.png');
  const wealthCreation = require('../../assets/Images/Goals/wealth-creation.png');

  GoalsIcon = ({data}) => {
    let goalIcon;
    switch (data.GoalName) {
      case 'Car':
        goalIcon = car;
        break;
      case 'Contingency Fund':
        goalIcon = contingencyFund;
        break;
      case 'House':
        goalIcon = house;
        break;
      case 'Kids Education':
        goalIcon = kidsEducation;
        break;
      case 'Loan Payoff':
        goalIcon = loanPayoff;
        break;
      case 'Marriage':
        goalIcon = marriage;
        break;
      case 'Medical Corpus':
        goalIcon = medicalCorpus;
        break;
      case 'Others':
        goalIcon = others;
        break;
      case 'Retirement':
        goalIcon = retirement;
        break;
      case 'Sabbatical':
        goalIcon = sabbatical;
        break;
      case 'Vacation Trip':
        goalIcon = vacationTrip;
        break;
      case 'Wealth Creation':
        goalIcon = wealthCreation;
        break;
      default:
        goalIcon = others;
        break;
    }
    return goalIcon;
  };

  useEffect(() => {
    const uri = key;
    const encoded = encodeURI(uri);

    // console.log('encoded', encoded);
    fetchData(encoded);
  }, []);

  let keyexists = Object.keys(data).some(
    ParentGoalKey => data[ParentGoalKey] === '',
  );
  let assetexists = Object.keys(data).some(
    AssetsAllocated => data[AssetsAllocated] === '',
  );
  let recommendationsexists = Object.keys(data).some(
    Recommendations => data[Recommendations] === '',
  );

  // console.log(data1.ParentGoalKey);
  // const getLink = () => {

  // }

  // var link = dynamicLinks().buildShortLink(
  //     {
  //       link: 'https://moneyfrog.page.link/native',
  //       domainUriPrefix: 'https://moneyfrog.page.link',
  //       android: {
  //         packageName: 'com.moneyfrog',
  //       },
  //       ios: {
  //         appStoreId: '123456789',
  //         bundleId: 'com.moneyfrog',
  //       },

  //     },
  //     dynamicLinks.ShortLinkType.UNGUESSABLE,
  //   );

  const renderParentGoalsData = ({item, index}) => (
    // <TouchableOpacity onPress={() => setModalInfo(subGoals)}>
    // <TouchableOpacity onPress={() => setShowModal(!showModal)}>

    <View style={{backgroundColor: COLORS.lightGrey}}>
      {/* <Text style={{...FONTS.h4}}>GoalName :- {item.GoalName}</Text> */}
      {/* <Text>HolderName :- {item.HolderName}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.lightGrey,
        }}>
        <Text style={{fontSize: 18, margin: 3, color: COLORS.black}}>
          {item.Remark}
        </Text>
        <Text style={{fontSize: 18, margin: 3, color: COLORS.black}}>
          - {amountToText(item.TargetAmount)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 10,
          backgroundColor: COLORS.main,
          margin: 10,
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
            TargetYear
          </Text>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            {item.TargetYear}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
            Current cost
          </Text>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            {amountToText(item.CurrentCost)}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
            EMI
          </Text>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            {amountToText(item.Emi)}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
            Shortfall
          </Text>
          <Text style={{color: COLORS.red, fontSize: 16}}>
            {amountToText(item.Shortfall)}
          </Text>
        </View>
      </View>

      {/* <View
              style={{
                flexDirection: 'row',
                margin: 8,
                justifyContent: 'space-evenly',
                backgroundColor:COLORS.white,
                borderRadius:10,
                margin: 10,
                padding:10
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{...FONTS.h4, color: COLORS.grey}}> Asset Class </Text>
                <Text style={{...FONTS.h4, color: COLORS.grey}}> Existing </Text>
                <Text style={{...FONTS.h4, color: COLORS.grey}}> Recommended </Text>
                <Text style={{...FONTS.h4, color: COLORS.grey}}> Shortfall </Text>
              </View>
      
              <FlatList
                data={item.Recommendations}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginHorizontal: 30,
                      }}>
                      <View style={{}}>
                        <Text style={{...FONTS.h5, color: COLORS.black}}>
                          {item.AssetClass}
                        </Text>
                      </View>
      
                      <View>
                        <Text style={{...FONTS.h5, color: COLORS.black}}>
                          {item.Existing}
                        </Text>
                      </View>
      
                      <View>
                        <Text style={{...FONTS.h5, color: COLORS.black}}>
                          {item.Recommended}
                        </Text>
                      </View>
      
                      <View>
                        <Text style={{...FONTS.h5, color: COLORS.red}}>
                          {amountToText(item.Shortfall)}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View> */}
      {/* <FlatList
              data={item.AssetsAllocated}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View
                  // style={{
                  //   flexDirection: 'row',
                  //   justifyContent: 'space-between',
                  // }}
                  >
                    <View style={{flexDirection: 'column'}}>
                      <Text>Asset Name :- {item.Name}</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text>Asset Value :- {item.Value}</Text>
                      <Text>{'\n'}</Text>
                    </View>
                  </View>
                );
              }}
            /> */}
    </View>
    // </TouchableOpacity>
  );

  function ParentGoalsData() {
    return (
      <>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: 200,
              alignItems: 'center',
            }}>
            <SkypeIndicator color="#a7ce51" count={5} size={80} />
          </View>
        ) : (
          <View style={{marginBottom: 200}}>
            {/* <Text>ParentGoalKey is Present</Text> */}
            {/* <TouchableOpacity onPress={() => setShouldShow(!shouldShow)
            }>  */}

            <FlatList
              data={subGoals}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderParentGoalsData}
            />
          </View>
        )}
      </>
    );
  }

  function NoParentGoalsData() {
    return (
      <View>{/* <Text> Parent Goal Key is NOT Present ...</Text> */}</View>
    );
  }

  function NoRecommendations() {
    return <View>{/* <Text>No Recommendations </Text> */}</View>;
  }
  function Recommendations() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            margin: 10,
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: COLORS.main,
            borderRadius: 10,
          }}>
          <Text style={{...FONTS.h4, color: COLORS.black}}> Asset Class </Text>
          <Text style={{...FONTS.h4, color: COLORS.black}}> Existing </Text>
          <Text style={{...FONTS.h4, color: COLORS.black}}> Recommended </Text>
          <Text style={{...FONTS.h4, color: COLORS.black}}> Shortfall </Text>
        </View>
        <View style={{}}>
          <FlatList
            data={data.Recommendations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRecommendations}
          />
        </View>
      </View>
    );
  }
  function NoAsset() {
    return <View></View>;
    //<Text>No Asset Data</Text>
  }

  function Assets() {
    return (
      // <View>
      //   <FlatList
      //     data={data.AssetsAllocated}
      //     keyExtractor={(item, index) => index.toString()}
      //     renderItem={renderSubGoals}
      //   />
      // </View>
      <View>
        <Text> {data.id}</Text>
      </View>
    );
  }
  const renderSubGoals = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      }}>
      <Text style={{...FONTS.h4}}>Asset Allocated Name - {item.Name}</Text>
      <Text> - {amountToText(item.Value)}</Text>
    </View>
  );

  // const renderRecommendations = ({item, index}) => (
  //   <View style={{
  //     flexDirection:'row',
  //     justifyContent:'space-between',
  //     margin:5,
  //     marginHorizontal:12,
  //     padding:5,
  //     borderRadius:10,
  //     backgroundColor:COLORS.white
  //     }}>
  //     <Text style={{fontSize:14, margin:10, color: COLORS.black}}>{item.AssetClass}</Text>
  //     <Text style={{fontSize:10, margin:10, color: COLORS.black}}>{item.Existing}</Text>
  //     <Text style={{fontSize:10, margin:10, color: COLORS.black}}>{item.Recommended}</Text>
  //     <Text style={{fontSize:10, margin:10, color: COLORS.red}}>{amountToText(item.Shortfall)}</Text>
  //   </View>
  // );

  return (
    <View>
      <SafeAreaView>
        <HeaderComponent
          goBack={() => navigation.goBack()}
          text={data.GoalName}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={GoalsIcon({data})}
              style={{
                width: 35,
                height: 40,
                tintColor: COLORS.main,
                borderRadius: 5,
                margin: 10,
              }}
            />
            <Text style={{fontSize: 20, margin: 3, color: COLORS.black}}>
              {data.GoalName}
              {/* {Object.keys(data, 'id')} */}
            </Text>
            <Text style={{...FONTS.h3, margin: 3, color: COLORS.black}}>
              {' '}
              - {amountToText(data.TargetAmount)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: COLORS.main,
              borderRadius: 5,
              padding: 10,
              margin: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
                Target Year
              </Text>
              <Text style={{fontSize: 18}}>{data.TargetYear}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
                Curr. Cost
              </Text>
              <Text style={{fontSize: 18}}>
                {amountToText(data.CurrentCost)}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
                Curr. Ach.
              </Text>
              <Text style={{fontSize: 18}}>{data.Achieved} %</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{fontSize: 14, color: COLORS.white, marginVertical: 5}}>
                Shortfall
              </Text>
              <Text style={{color: COLORS.red, fontSize: 18}}>
                {amountToText(data.Shortfall)}
              </Text>
            </View>
          </View>
        </View>

        <View>
          {assetexists ? <View>{Assets()}</View> : <View>{NoAsset()}</View>}
          {/* {assetexists && <View>{Assets()}</View>}
        {!assetexists && <View>{NoAsset()}</View>} */}
        </View>
        <View>
          {recommendationsexists ? (
            <View></View>
          ) : (
            // <View>{Recommendations()}</View>
            <View>{NoRecommendations()}</View>
          )}
          {/* {recommendationsexists && <View>{Recommendations()}</View>}    
        {!recommendationsexists && <View>{NoRecommendations()}</View>} */}
        </View>
        <View>
          {keyexists ? (
            <View>{NoParentGoalsData()}</View>
          ) : (
            <View>{ParentGoalsData()}</View>
          )}
          {/* {keyexists && <View>{NoParentGoalsData()}</View>}
        {!keyexists && <View>{ParentGoalsData()}</View>} */}
        </View>

        <View
          style={{
            padding: 5,
            margin: 10,
            height: 100,
          }}></View>
      </SafeAreaView>
    </View>
  );
};

export default SubGoals;
