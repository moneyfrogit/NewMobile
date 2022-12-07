import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  SectionList,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import AppHeader from '../../components/HeaderSimple';
import imagePath from '../../constants/imagePath';
import {Card, ProgressBar} from 'react-native-paper';
import Axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {VictoryPie} from 'victory-native';
import LinearGradient from 'react-native-linear-gradient';
import {Svg} from 'react-native-svg';
import HeaderComponent from '../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import EquityData from '../../components/Dashboard/EquityData';
import MUtualFundsData from '../../components/Dashboard/MutualFunds';
import RenderTitle from '../../components/RenderTitle';
import navigationStrings from '../../constants/navigationStrings';
import Fixed_Income from '../../components/Dashboard/Fixed_Income';
import {NetworthAPI} from '../../API/NetworthAPI';
import {getData} from '../../API/Api';
import NetworthComponent from '../../components/Dashboard/NetworthComponent';
import DashboardSectionDivider from '../../utils/Divider';
import AssetAllocation from '../../components/Dashboard/AssetAllocation';
import {amountToText} from '../../utils/Amounts';
import DashboardLoans from '../../components/Dashboard/DashboardLoans';
import DashboardInsurance from '../../components/Dashboard/DashboardInsurance';
import DashboardRealEstate from '../../components/Dashboard/DashboardRealEstate';
import DashboardBullions from '../../components/Dashboard/DashboardBullions';
import {wp, hp} from '../../constants/WH';
import Tooltip from 'react-native-walkthrough-tooltip';

const HomeScreen = ({data, navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [state, setState] = useState({Equitydata: [], loading: false}); // only one data source
  const {Equitydata, loading} = state;
  const [currValue, setCurrValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mutualFundSummary, setMutualFundSummary] = useState('');
  const [mutualFData, setMutualFData] = useState('');
  const [mutualFundsData, setMutualFundsData] = useState('');
  const [mutualFunds, setMutualFunds] = useState('');
  const [networthData, setNetworthData] = useState('');
  const [mFData, setMFData] = useState('');
  const [assetCheck, setAssetCheck] = useState(false);
  const [viewMode, setViewMode] = React.useState('AllAssets');
  const [showTip, setTip] = useState(false);
  // dummy data
  const confirmStatus = 'C';
  const pendingStatus = 'P';

  useEffect(() => {
    setIsLoading(true);
    DetailQuestionary();
    aaAPI();
    MFSummary();
    setIsLoading(false);
  }, []);

  const MFSummary = async () => {
    // setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      const result = await axios
        .get(
          'https://moneyfrog.in/api_controller/mutual_funds_summary/' + userID,
        )
        .then(result => result.data)
        .then(result => {
          //console.log('MF Summary 1', result);
          setMutualFundSummary(result.SinceInception);
          // mutualFundSummary && mutualFundSummary.map(x => console.log(x.Amount));
          // console.log('MF Summary 2', mutualFundSummary);
        });
    } catch (err) {
      console.log(err);
      // setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  let totalV = 0;
  mutualFundSummary &&
    mutualFundSummary.map(x => {
      totalV += parseFloat(x.Amount);
    });
  // console.log('totalV',totalV);
  //console.log('MF Summary 3', mutualFundSummary.SinceInception);

  const DetailQuestionary = async () => {
    // setGoalsLoading(true);
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await axios
        .get(
          'https://moneyfrog.in/detailed-questionary/' +
            userID +
            '?api=mobile_api&login_token=' +
            userToken,
        )
        .then(result => result.data)
        .then(result => {
          // console.log('Asset Category Data', result);
          setMFData(result);
          // console.log('MF Summary 2', mFData);
        });
    } catch (err) {
      console.log(err);
      // setGoalsError(err.message || 'Unexpected Error!');
    } finally {
      //setGoalsLoading(false);
    }
  };

  const aaAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      axios
        .get('https://moneyfrog.in/mac/get_aa_mf/' + userID)
        .then(response => response.data)
        .then(data => {
          //console.log(data);
          // setMFData(data);
          // console.log('aa mf', mFData);
        })
        .catch(function (error) {
          // handle error
          console.log('Error in fetching data', error);
          // console.log(error);
        })
        .then(function () {
          // always executed
        });
    } catch (err) {
      console.log(err);
    }
  };

  let categories = [
    {
      id: 1,
      name: 'Mutual Funds',
      icon: imagePath.icBuySell,
      color: COLORS.main,
      expenses: [
        {
          id: 1,
          title: 'Corporate Bonds',
          description: '₹ 3.93 L',
          location: 'Moneyfrog Financials',
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: 'Debt',
          description: '₹ 7.02 L',
          location: 'Moneyfrog Financials Pvt Ltd',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: 'Large Cap',
          description: '₹ 8.63 L',
          location: 'Moneyfrog Financials Pvt Ltd',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 4,
          title: 'Small Cap',
          description: '₹ 12.11 L',
          location: 'Moneyfrog Financials',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 5,
          title: 'Mid Cap',
          description: '₹ 13.25 L',
          location: 'Moneyfrog Financials Pvt Ltd',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 6,
          title: 'International',
          description: '₹ 3.08 L',
          location: 'Moneyfrog Financials',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 7,
          title: 'Gold',
          description: '₹ 45.63 K',
          location: 'Moneyfrog Financials Pvt Ltd',
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 11,
          title: 'Javascript Books',
          description: 'Javascript books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 12,
          title: 'PHP Books',
          description: 'PHP books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: 'Equity',
      icon: imagePath.icDashboard,
      color: COLORS.brown,
      expenses: [
        {
          id: 5,
          title: 'Vitamins',
          description: 'Vitamin',
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },

        {
          id: 6,
          title: 'Protein powder',
          description: 'Protein',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: 'Fixed Income',
      icon: imagePath.icGoals,
      color: COLORS.darkGreen,
      expenses: [
        {
          id: 7,
          title: 'Toys',
          description: 'toys',
          location: "ByProgrammers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: 'Baby Car Seat',
          description: 'Baby Car Seat',
          location: "ByProgrammers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: 'Pampers',
          description: 'Pampers',
          location: "ByProgrammers' Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: 'Baby T-Shirt',
          description: 'T-Shirt',
          location: "ByProgrammers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: 'Insurance',
      icon: imagePath.icNetworth,
      color: COLORS.peach,
      expenses: [
        {
          id: 11,
          title: 'Skin Care product',
          description: 'skin care',
          location: "ByProgrammers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: 'Lotion',
          description: 'Lotion',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: 'Face Mask',
          description: 'Face Mask',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: 'Sunscreen cream',
          description: 'Sunscreen cream',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: 'Bullions',
      icon: imagePath.icReadings,
      color: COLORS.dBlue,
      expenses: [
        {
          id: 15,
          title: 'Gym Membership',
          description: 'Monthly Fee',
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: 'Gloves',
          description: 'Gym Equipment',
          location: "ByProgrammers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: 'Real Estate',
      icon: imagePath.ic_calculator,
      color: COLORS.red,
      expenses: [
        {
          id: 17,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: 'Jeans',
          description: 'Blue Jeans',
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 7,
      name: 'Loans',
      icon: imagePath.ic_calculator,
      color: COLORS.black,
      expenses: [
        {
          id: 19,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 20,
          title: 'Jeans',
          description: 'Blue Jeans',
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 8,
      name: 'Others',
      icon: imagePath.ic_calculator,
      color: COLORS.yellow,
      expenses: [
        {
          id: 21,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 22,
          title: 'Jeans',
          description: 'Blue Jeans',
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];

  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115),
  ).current;
  // const [viewMode, setViewMode] = React.useState('chart');
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showMoreToggle, setShowMoreToggle] = React.useState(false);

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          flex: 1,
        }}>
        <View
          style={{
            padding: 5,
            marginLeft: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: COLORS.DarkBlue, ...FONTS.h3}}>
              PORTFOLIO SUMMARY
            </Text>
          </View>
          {/* <Ionicons/>  */}
          <View style={{marginRight: 20, marginTop: 2}}>
            <Tooltip
              isVisible={showTip}
              content={
                <View style={{padding:5}}>
                  <Text style={{color:COLORS.black}}> ABS % -</Text>
                  <Text style={{textAlign:'justify', margin:3, color:COLORS.darkGray}}>
                    The absolute return or simply return is a measure of the
                    gain or loss on an investment portfolio expressed as a
                    percentage of invested capital.
                  </Text>
                  <DashboardSectionDivider/>
                  <Text style={{color:COLORS.black}}> XIRR -</Text>
                  <Text style={{textAlign:'justify', margin:3,  color:COLORS.darkGray}}>
                    Extended Internal Rate of Return. It is your actual return on
                    investments. XIRR stands for Extended Internal Rate of
                    Return is a method used to calculate returns on investments
                    where there are multiple transactions happening at different
                    times
                  </Text>
                </View>
              }
              onClose={() => setTip(false)}
              placement="bottom"
              // below is for the status bar of react navigation bar
              topAdjustment={
                Platform.OS === 'android' ? -StatusBar.currentHeight : 0
              }>
              <TouchableOpacity onPress={() => setTip(true)}>
                <Image
                  source={imagePath.ic_info}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.darkGray,
                  }}
                />
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>

        <View style={{}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.BUYSELLSCREEN)
            }>
            <MUtualFundsData />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.EQUITY)}>
            <EquityData />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.FIXEDINCOME)}>
            <Fixed_Income />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.LOANS)}>
            <DashboardLoans />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.INSURANCE)}>
            <DashboardInsurance />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.REALESTATE)}>
            <DashboardRealEstate />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.BULLIONS)}>
            <DashboardBullions />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const AssetAllocationItem = ({item, index}) => (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.black}}>{item.category} </Text>
        <Text style={{color: COLORS.black, marginLeft: 10}}>
          {'\u20B9'} {amountToText(item.total)}
        </Text>
      </View>

      <View style={{flexDirection: 'row', width: '90%'}}>
        <View style={{width: '90%'}}>
          <ProgressBar
            style={{
              height: 12,
              borderRadius: 10,
              width: '95%',
              backgroundColor: COLORS.grey2,
            }}
            color="rgba(251, 197, 49,0.7)"
            progress={(item.total / mFData.total_of_all_assets) % 100}
          />
        </View>
        <View>
          <Text style={{color: COLORS.black}}>
            {((item.total / mFData.total_of_all_assets) * 100).toFixed(2)} %
          </Text>
        </View>
      </View>
    </View>
  );

  // console.log('TotalMFAmount', TotalMFAmount);

  const MutualFundsItem = ({item, index}) => (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.black}}>{item.Category} </Text>
        <Text style={{color: COLORS.black, marginLeft: 10}}>
          {'\u20B9'}
          {amountToText(item.Amount)}
        </Text>
        <Text style={{color: COLORS.black, marginLeft: 10}}>
          {' '}
          Xirr : {item.Xirr}
        </Text>
      </View>

      <View style={{flexDirection: 'row', width: '90%'}}>
        <View style={{width: '90%'}}>
          <ProgressBar
            style={{
              height: 12,
              borderRadius: 10,
              width: '95%',
              backgroundColor: COLORS.grey2,
            }}
            color="rgba(251, 197, 49,0.7)"
            progress={(item.Amount / totalV) % 100}
          />
        </View>

        <View>
          <Text style={{color: COLORS.black}}>
            {((item.Amount / totalV) * 100).toFixed(2)} %
          </Text>
        </View>
      </View>
    </View>
  );

  function renderMutualFunds() {
    return (
      <View style={{padding: 5, marginLeft: 15}}>
        <Text style={{...FONTS.body3, margin: 10, color: COLORS.black}}>
          {/* Total {'\u20B9'} {amountToText(mFData.total_of_all_assets)} */}
          Total {'\u20B9'} {amountToText(totalV)}
        </Text>
        <FlatList
          data={mutualFundSummary}
          renderItem={MutualFundsItem}
          keyExtractor={item => item.id}
        />
        {/* <MutualFunds/> */}
      </View>
    );
  }

  function renderAssetAllocation() {
    return (
      <View style={{padding: 5, marginLeft: 15}}>
        {/* <Text style={{color: COLORS.DarkBlue,
         ...FONTS.h4,
         
        }}>
         ALL ASSET
        </Text> */}

        <Text style={{...FONTS.body3, margin: 10, color: COLORS.black}}>
          Total {'\u20B9'} {amountToText(mFData.total_of_all_assets)}
        </Text>
        <FlatList
          data={mFData.data}
          renderItem={AssetAllocationItem}
          keyExtractor={item => item.id}
          // numColumns={2}
        />
        {/* <AssetAllocation/> */}
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>
            ASSET CATEGORIES
          </Text>
        </View>

        {/* Button */}
        {/* <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'list' ? COLORS.main : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode('list')}>
            <Image
              source={imagePath.ic_chart}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: viewMode == 'list' ? COLORS.white : COLORS.black,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'chart' ? COLORS.main : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode('chart')}>
            <Image
              source={imagePath.ic_list}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: viewMode == 'chart' ? COLORS.white : COLORS.black,
              }}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }

  function renderCategoryList() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding - 12,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
          onPress={() => setSelectedCategory(item)}>
          <Image
            source={item.icon}
            style={{
              width: 20,
              height: 20,
              tintColor: item.color,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: item.color,
              ...FONTS.h4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{paddingHorizontal: SIZES.padding - 5}}>
        <Animated.View style={{height: categoryListHeightAnimationValue}}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </Animated.View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 200,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 220,
                duration: 200,
                useNativeDriver: false,
              }).start();
            }
            setShowMoreToggle(!showMoreToggle);
          }}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>
            {showMoreToggle ? 'Less' : 'More'}
          </Text>
          <Image
            source={showMoreToggle ? imagePath.ic_up : imagePath.ic_down}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderIncomingExpensesTitle() {
    return (
      <View
        style={{
          alignItems: 'flex-start',
          height: 80,
          backgroundColor: COLORS.lightGrey,
          padding: 10,
        }}>
        <Text style={{color: COLORS.black, ...FONTS.h3}}>
          CATEGORY WISE DATA
        </Text>
      </View>
    );
  }

  function renderIncomingExpenses() {
    let allExpenses = selectedCategory ? selectedCategory.expenses : [];
    let incomingExpenses = allExpenses.filter(a => a.status == 'P');

    const renderItem = ({item, index}) => (
      <View
        style={{
          width: 250,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginVertical: 20,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        {/* Title */}
        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
          <View
            style={{
              height: 30,
              width: 40,
              borderRadius: 25,
              backgroundColor: COLORS.lightGrey,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.base,
            }}>
            <Image
              source={selectedCategory.icon}
              style={{
                width: 30,
                height: 30,
                tintColor: selectedCategory.color,
              }}
            />
          </View>

          <Text style={{...FONTS.h3, color: selectedCategory.color}}>
            {selectedCategory.name}
          </Text>
        </View>

        {/* Expense Description */}
        <View style={{paddingHorizontal: 30}}>
          {/* Title and description */}
          <Text style={{...FONTS.h3, marginBottom: 5}}>{item.title}</Text>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: COLORS.main}}>Invested Value : </Text>
            <Text>{item.description}</Text>
            <Text style={{color: COLORS.main}}>Current Value : </Text>
            <Text>{item.description}</Text>
          </View>

          {/* Location */}
          <Text style={{marginTop: 10, ...FONTS.h4}}>Holder Name</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={imagePath.ic_profile}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkGray,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                marginBottom: SIZES.base,
                color: COLORS.darkGray,
                ...FONTS.body4,
              }}>
              {item.location}
            </Text>
          </View>
        </View>

        {/* Price */}
        {/* <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomStartRadius: SIZES.radius,
            borderBottomEndRadius: 5,
            backgroundColor: selectedCategory.color,
          }}>
          <Text style={{color: COLORS.white, ...FONTS.body3}}>Invest More</Text>
        </View> */}
      </View>
    );

    return (
      <View>
        {renderIncomingExpensesTitle()}
        {incomingExpenses.length > 0 && (
          <View style={{marginTop: -40}}>
            <FlatList
              data={incomingExpenses}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedscrollenabled={true}
            />
          </View>
        )}
        {incomingExpenses.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>No Records</Text>
          </View>
        )}
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map(item => {
      let confirmExpenses = item.expenses.filter(a => a.status == 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter(a => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map(item => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0,
    );

    // console.log('Check Chart');
    // console.log(chartData);

    if (Platform.OS == 'ios') {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <VictoryPie
            data={chartData}
            labels={datum => `${datum.y}`}
            radius={({datum}) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({innerRadius}) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: {fill: 'white'},
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: props => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{position: 'absolute', top: '42%', left: '40%'}}>
            <Text
              style={{...FONTS.body2, textAlign: 'center', fontWeight: 'bold'}}>
              Asset Pie
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Svg
            width={SIZES.width}
            height={SIZES.width}
            style={{width: '100%', height: 'auto'}}>
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              labels={datum => `${datum.y}`}
              radius={({datum}) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({innerRadius}) =>
                (SIZES.width * 0.4 + innerRadius) / 2.5
              }
              style={{
                labels: {fill: 'white', ...FONTS.body1},
                parent: {
                  ...styles.shadow,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={colorScales}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: props => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{position: 'absolute', top: '46%', left: '42%'}}>
            <Text style={{...FONTS.body3, textAlign: 'center'}}>Asset Pie</Text>
          </View>
        </View>
      );
    }
  }

  function renderCategorySummary() {
    let data = processCategoryDataToDisplay();
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}>
        {/* Name/Category */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.black,
              ...FONTS.h3,
            }}>
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.black,
              ...FONTS.h4,
            }}>
            {' '}
            {'\u20B9'}
            {item.y}L {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{padding: SIZES.padding}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          nestedscrollenabled={true}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightGrey}}>
      <StatusBar backgroundColor="#a7ce51" barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            backgroundColor: COLORS.lightGrey,
          }}>
          <HeaderComponent text="Home" />
          {/* <AppHeader title="Home" menu optionalBtn="bell" right="more-vertical" /> */}
        </View>
        <NetworthComponent icon={imagePath.ic_arrowright} />
        <ScrollView contentContainerStyle={{paddingBottom: 450}}>
          {renderHeader()}
          <DashboardSectionDivider />
          <RenderTitle title="ASSET ALLOCATION" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // backgroundColor:COLORS.lightGrey2
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.main,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: COLORS.black,
                backgroundColor:
                  viewMode == 'AllAssets' ? COLORS.main : COLORS.darkGray,
              }}
              onPress={() => setViewMode('AllAssets')}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                  marginHorizontal: 30,
                  margin: 5,
                }}>
                {' '}
                ALL ASSETS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.main,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: COLORS.black,
                backgroundColor:
                  viewMode == 'MutualFunds' ? COLORS.main : COLORS.darkGray,
              }}
              onPress={() => setViewMode('MutualFunds')}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                  marginHorizontal: 30,
                  margin: 5,
                }}>
                {' '}
                MUTUAL FUNDS
              </Text>
            </TouchableOpacity>
          </View>

          {viewMode == 'AllAssets' && (
            <View style={{paddingBottom: 10}}>{renderAssetAllocation()}</View>
          )}
          {viewMode == 'MutualFunds' && <View>{renderMutualFunds()}</View>}
          <DashboardSectionDivider />
        </ScrollView>

        {/* <ScrollView contentContainerStyle={{paddingBottom: 450}}>
          <View style={{paddingBottom: 10}}>
          {renderCategoryHeaderSection()}
            {renderCategoryList()}
            {renderChart()}
          </View>
        </ScrollView> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.83,
    elevation: 3,
  },
});

export default HomeScreen;

// API = https://moneyfrog.in/detailed-questionary/16154?api=mobile_api&login_token=fsgj8GFLRBCpDXHjQ-TCRh%3AAPA91bF7QbWZwswuvXseJT_yCILpaOP5Un641RvBT9UZF58Pq86xInC_xnRAXkzIPCEqjds6P0gcMs3R-mixE7WHa978b4UcMW0zXr8XDu3BXtgA7QmXLVGwco092f858ZejLuk9KOg5
// {viewMode == 'chart' && (
//   <View style={{paddingBottom: 10}}>
//     {renderCategoryList()}
//     {renderChart()}
//     {renderIncomingExpenses()}
//   </View>
// )}
// {viewMode == 'list' && (
//   <View>
//     {renderChart()}
//     {renderCategorySummary()}
//   </View>
// )}
