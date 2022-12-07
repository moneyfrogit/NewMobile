import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderTitle from '../../components/RenderTitle';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import {Card} from 'react-native-paper';
import {amountToText} from '../../utils/Amounts';
import DashboardSectionDivider from '../../utils/Divider';
import {Col, Grid} from 'react-native-easy-grid';
import styles from './Styles';
import imagePath from '../../constants/imagePath';
import { SkypeIndicator } from 'react-native-indicators';
import { Dimensions } from "react-native";
import {useWindowDimensions} from 'react-native';
import { hp, wp } from '../../constants/WH';


export default function GoalsScreen({navigation, route}) {
  const [sip, setSip] = useState(null);
  const [sipError, setSipError] = useState('');
  const [sipLoading, setSipLoading] = useState(false);

  const [goals, setGoals] = useState('');
  const [goalsError, setGoalsError] = useState('');
  const [goalsLoading, setGoalsLoading] = useState(false);

  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [key, setKey] = useState('');
  //Set Sip values
  const [annualReturns, setAnnualReturns] = useState('');
  const [buyValue, setBuyValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [diff, setDiff] = useState('');
  const [sipPerMonth, setSipPermonth] = useState('');
  const [totalGoalsMappedValue, setTotalGoalsMappedValue] = useState('');
  const [totalGoalsValue, setTotalGoalsValue] = useState('');
  const [totalSipRequired, setTotalSipRequired] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  GoalsIcon = ({item}) => {
    let goalIcon;
    switch (item.GoalName) {
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

  const GoalColors= [
    '#994F14','#DA291C','#FFCD00','#007A33','#EB9CA8', '#00a3e0', '#7C878E',
    '#8A004F','#000000','#10069F','#00a3e0','#4CC1A1'
]
  //Set Goals values
  const [achieved, setAchieved] = useState([]);
  useEffect(() => {
    SectionSip();
    SectionGoals();
    
  }, []);

  //JavaScript function to get time differences in months between two dates

  // function getMonthDifference(startDate, endDate) {
  //   return (
  //     endDate.getMonth() -
  //     startDate.getMonth() +
  //     12 * (endDate.getFullYear() - startDate.getFullYear())
  //   );
  // }
  
  // // 👇️ 2
  // console.log(getMonthDifference(
  //   new Date('1993-04-18'), new Date('2022-04-18'))
  // );
  
  // // 👇️ 5
  // console.log(getMonthDifference(
  //   new Date('2022-01-15'), new Date('2022-06-16'))
  // );
  
  // // 👇️ 14
  // console.log(getMonthDifference(
  //   new Date('2022-01-15'), new Date('2023-03-16'))
  // );
//https://bobbyhadz.com/blog/javascript-get-number-of-months-between-two-dates

  const SectionSip = async () => {
    const userID = await AsyncStorage.getItem('userId');
    setUserID(userID);
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken);
    setSipLoading(true);
    setIsLoading(true);
    try {
      const result = await axios
        .get(
          'https://moneyfrog.in/home/mobile_api_goals/' +
            userID +
            '/mobile-api-goals?login_token=' +
            userToken +
            '&mobile_section=dashboard_sip_section',
        )
        .then(result => result.data.Response)
        .then(result => {
          console.log('Sip Section', result);
          //setSip(result.Response);
          //console.log('set sip', sip);
          setAnnualReturns(result.AnnualReturns);
          setBuyValue(result.BuyValue);
          setCurrentValue(result.CurrValue);
          setDiff(result.Diff);
          setSipPermonth(result.SipPerMonth);
          setTotalGoalsMappedValue(result.TotalGoalsMappedValue);
          setTotalGoalsValue(result.TotalGoalsValue);
          setTotalSipRequired(result.TotalSipRequired);
          //console.log('Sip Section',result.Response);
        });
      setSip(result.data);
      console.log('set ', sip);
    } catch (err) {
      setSipError(err.message || 'Unexpected Error!');
    } finally {
      setSipLoading(false);
    }
  };

  const SectionGoals = async () => {
    setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);

      const result = await axios
        .get(
          'https://moneyfrog.in/home/mobile_api_goals/' +
            userID +
            '/mobile-api-goals?login_token=' +
            userToken +
            '&mobile_section=goals_section',
        )
        .then(result => result.data.Response)
        .then(result => {
          console.log('Goals Section', result);
          setGoals(result);
          setAchieved(result.achieved);
          setGoalsLoading(false);
          setIsLoading(false);
        });
    } catch (err) {
      setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  // const toggleModal = (data) => {
  //   console.log(data);
  // }

  const renderGoals = ({item, index, goalName}) => (
    <View style={{width:'48%', margin:3}}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationStrings.SUBGOALS, {
          data: item,
          key: item.ParentGoalKey,
        });
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 150,
          marginBottom:wp("2%"),
          marginHorizontal:5,
          // width: '50%',
          backgroundColor: COLORS.white,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            source={GoalsIcon({item})}
            style={{
              width: 30,
              height: 30,
              tintColor: GoalColors[index%GoalColors.length],
              backgroundColor:COLORS.lightGrey,
              borderRadius: 10,
              marginRight: 3,
            }}
          />

          <Text style={{...FONTS.h4, margin: 3, color:GoalColors[index%GoalColors.length]}}>
            {item.GoalName}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{margin: 3, color: COLORS.grey}}>
            Target Year{' '}
          </Text>
          <Text style={{marginBottom: 10, fontSize: 24, color: COLORS.black}}>
            {item.TargetYear}
          </Text>
        </View>
      </View>

    </TouchableOpacity></View>
  );

  return (
<>
{
  isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <SkypeIndicator color="#a7ce51" count={5} size={80} />
  </View>
  ) : (
    <View
    style={{
      flex: 1,
        marginBottom: 690,
    }}>
    <SafeAreaView style={{}}>
      <HeaderComponent text="Goals" />

      <RenderTitle title="GOALS SECTION" textcolor='black'/>
      {/* <Text style={{padding:5, fontSize:16}}>Sip Per Month : - {sipPerMonth}</Text> */}
      <View>
        <Card
          style={{
            width: '93%',
            height: 150,
            borderRadius: 5,
            backgroundColor: COLORS.main,
            padding: 10,
            margin: 15,
            paddingHorizontal: 1,
            marginVertical: 8,
            ...styles.shadow,
          }}>
          <View
            style={{
              margin: 10,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{fontSize:12, color: COLORS.white}}>
                TOTAL LIFE GOALS VALUE
              </Text>
              <Text style={{fontSize:12, color: COLORS.white}}>
                MAPPED PROJECTED VALUE
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                ...FONTS.body3,
                marginVertical: 5,
              }}>
              <Text style={{fontSize: 18, color:COLORS.white}}>
                {amountToText(totalGoalsValue)}
              </Text>
              <Text style={{fontSize: 18, color:COLORS.white}}>
                {amountToText(totalGoalsMappedValue)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
                marginLeft:20
              }}>
              <Text style={{fontSize:12, color: COLORS.white}}>
                {' '}
                SHORTFALL
              </Text>
              <Text style={{fontSize:12, color: COLORS.white}}>
                MONTHLY SIP REQUIRED
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginRight:15
              }}>
              <Text style={{fontSize: 18, color: COLORS.red}}>
                {amountToText(totalGoalsValue - totalGoalsMappedValue)}
              </Text>
              <Text style={{fontSize: 18, color:COLORS.white}}>
                {amountToText(totalSipRequired)}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 5,
            }}>


            <View
              style={{
                backgroundColor: COLORS.lightGrey2,
                height: 40,
                width: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Images/Networth/ic_equity.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>

            <View style={{marginLeft: SIZES.padding, flexDirection: 'row'}}>
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.h3,
                  fontWeight: 'bold',
                }}>
                SIP Per Month: {amountToText(sipPerMonth)}
              </Text>
            </View>
          </View>
          <View style={{margin: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{...FONTS.body4, color: COLORS.darkGray}}>
                  Buy Value
                </Text>
                <Text style={{...FONTS.body3}}>
                  {'\u20B9'} {amountToText(buyValue)}
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGray,
                    marginRight: 15,
                  }}>
                  Current Value
                </Text>
                <Text style={{...FONTS.body3}}>
                  {'\u20B9'} {amountToText(currentValue)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.red,
                    marginTop: 10,
                  }}>
                  Gain/Loss
                </Text>
                <Text style={{...FONTS.body3}}>
                  {'\u20B9'} {amountToText(diff)}
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGray,
                    marginTop: 10,
                  }}>
                  Annual Returns
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.red}}>
                  {' '}
                  {annualReturns} %
                </Text>
              </View>
            </View>
          </View> */}
        </Card>
      </View>

      {/* <View
        style={{
          height: 110,
          width: '93%',
          margin: 15,
          padding: 5,
          backgroundColor: COLORS.main,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{...FONTS.body4}}>Total Life Goals Value</Text>
          <Text style={{...FONTS.body4}}>Mapped Projected Value</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            ...FONTS.body3,
          }}>
          <Text style={{...FONTS.h4}}>
            {amountToText(totalGoalsValue)}
          </Text>
          <Text style={{...FONTS.h4}}>
            {amountToText(totalGoalsMappedValue)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginRight: 30,
            marginVertical: 3,
          }}>
          <Text style={{...FONTS.body4}}>Monthly Sip Required</Text>
          <Text style={{...FONTS.body4}}> Shortfall</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={{...FONTS.h4}}>
            {amountToText(totalSipRequired)}
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.red}}>
            {amountToText(totalGoalsValue - totalGoalsMappedValue)}
          </Text>
        </View>
      </View> */}

      <DashboardSectionDivider />

      <RenderTitle title="SUB GOALS" />
      <View
        style={{
          width:SIZES.width,
        }}>
        <FlatList
          data={goals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderGoals}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  </View>
  )
}
</>
  );
}

// if(response.TotalGoalsValue <= response.TotalGoalsMappedValue){
//   shortfall = 0;
// }else{
//   shortfall = response.TotalGoalsValue - response.TotalGoalsMappedValue;
// }

//'https://moneyfrog.in/home/mobile_api_goals/'+userId+'/mobile-api-goals?login_token='+loginToken+'&mobile_section=goals_section&parent_key='+key
// import {Alert, StyleSheet, Text, View, Image} from 'react-native';
// import React, {Component} from 'react';
// import styles from './Styles';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import HeaderComponent from '../../components/HeaderComponent';
// import ButtonComponent from '../../components/ButtonComponent';
// import navigationStrings from '../../constants/navigationStrings';
// import AppHeader from '../../components/HeaderSimple';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
// import Share from 'react-native-share';
// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// import {Button, Card} from 'react-native-paper';
// import InvestMore from '../../components/InvestMore';
// import { COLORS, FONTS } from '../../constants/theme';
// import { AuthContext } from '../AuthScreens/Context';

// const GoalsScreen = ({navigation, route}) => {

//   const { signOut } = React.useContext(AuthContext);

//   function renderInvestMore() {
//     return <View
//     style={{
//       width:"100%",
//       height:60,
//       bottom:-60,
//       padding: 1,
//       borderRadius:20,
//       backgroundColor:COLORS.grey2,
//       justifyContent:'space-between',
//       alignItems:'center'
//     }}
//     >
//       <View
//       style={{
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignItems:'center'
//       }}
//       >
//       <Image source={require('../../assets/Images/Home/investMore.png')}
//       style={{
//         height:32,
//         width:32,
//         margin:10
//         }} />
//       <Text
//         style={{
//           ...FONTS.h4,
//           justifyContent:'center'
//         }}
//       >Invest more to achieve your goals soon!</Text>
//       <InvestMore />
//       </View>
//     </View>
//   }

//   const goToScreen = () => {
//     navigation.navigate(navigationStrings.SUBGOALS);
//   };

//   const generateLink = async () => {
//     try {
//       const link = await dynamicLinks().buildShortLink(
//         {
//           link: `https://moneyfrog.page.link/GoalsScreen?id=${'GoalsScreen'}`,
//           domainUriPrefix: 'https://moneyfrog.page.link',
//           android: {
//             packageName: 'com.moneyfrog',
//             minimumVersion: '18',
//           },
//           ios: {
//             appStoreId: '123456789',
//             bundleId: 'com.moneyfrog',
//             minimumVersion: '18',
//           },
//         },
//         dynamicLinks.ShortLinkType.DEFAULT,
//       );
//       return link;
//     } catch (error) {
//       console.log('error raised', error);
//     }
//   };

//   const shareme = async id => {
//     const getLink = await generateLink();
//     console.log('Newly generated link is', getLink);
//     Alert.alert('Newly generated link is', getLink);
//     const res = await Share.open({
//       message: 'Hey, check this out...',
//       url: getLink,
//     });
//     console.log('res==>>>', res);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <AppHeader
//         menu
//         title="Goals"
//         right="more-vertical"
//         rightFunction={() => console.log('right')}
//         optionalIcon="bell"
//         optionalFunction={() => console.log('optional')}
//       />
//       {/* <HeaderComponent text="Goals" /> */}
//       {/* <View style={styles.container}>
//         <ButtonComponent btnText="Go to Sub Goals" onPress={goToScreen} />
//       </View> */}
//       <ScrollView>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             padding: 20,
//             backgroundColor: '#ecf0f1',
//           }}>
//           <Card style={{backgroundColor: '#ecf0f1'}}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 padding: 20,
//               }}>
//               This is sample Card to show fund information or to buy or sell
//               Mutual fund schemes
//             </Text>
//             <ButtonComponent
//               btnText="Sample Fund Info "
//               // onPress={() => {signOut()}}
//                onPress={() => shareme(1234)}
//             />
//           </Card>
//         </View>
//         <View>
//         {renderInvestMore()}

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default GoalsScreen;

{/* <>
{isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SkypeIndicator color="#a7ce51" count={5} size={80} />
        </View>
      ) : (

      )
</>} */}