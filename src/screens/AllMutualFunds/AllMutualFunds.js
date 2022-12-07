import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import RenderTitle from '../../components/RenderTitle';
import {FlatListSlider} from 'react-native-flatlist-slider';
import imagePath from '../../constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
import {ScrollView} from 'react-native-gesture-handler';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import styles from './Styles';
import {Button} from 'react-native-paper';
import navigationStrings from '../../constants/navigationStrings';
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory-native';
import LinearGradient from 'react-native-linear-gradient';
import {Svg} from 'react-native-svg';
import {amountToText} from '../../utils/Amounts';

const ALLMUTUALFUNDS = ({navigation, route}) => {
  // const goToScreen = () => {
  //   navigation.navigate(navigationStrings.ALLMUTUALFUNDS, {
  //     // itemId: 126,
  //     // otherParam: 'anything ',
  //   });
  // };
  // console.log('params', route.item);


  const [categoryWise, setCategoryWise] = useState(null);
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [mutualFundsData, setMutualFundsData] = useState('');
  const [mutualFunds, setMutualFunds] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [categoryData, setcategoryData] = useState('');
  const [mutualFundSummary, setMutualFundSummary] = useState('');
  // Load data when the app starts

  const PieColors = [
    '#994F14',
    '#DA291C',
    '#FFCD00',
    '#007A33',
    '#EB9CA8',
    '#00a3e0',
    '#7C878E',
    '#8A004F',
    '#000000',
    '#10069F',
    '#00a3e0',
    '#4CC1A1',
    '#a7ce51',
    '#d8e7',
  ];

  const firstLoad = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      // setUserToken(userToken);

      setIsLoading(true);
      axios
        .get(
          'https://moneyfrog.in/financial-page-api/' +
            userID +
            '/mutual_funds?login_token=' +
            userToken,
        )
        .then(function (response) {
          setMutualFunds(response.data);
          setMutualFundsData(response.data.mutual_funds);
          // console.log('mf',mutualFunds);
          setIsLoading(false);
        })
        .catch(function (error) {
          // handle error
          if (error.response === '1') {
            console.log('mutual fund summary error 1', response.error);
          } else if (error.response === '0') {
            console.log('mutual fund summary error 0');
          }
          // console.log(error);
        })
        .then(function () {
          // always executed
          //setMutualFundsData(mf);
          //setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    firstLoad();
    MFSummary();
  }, []);

  // console.log('user', userID);
  // console.log('token', userToken);
  // console.log('mf summary outside function', mutualFundsData);
  // console.log(typeof mutualFundsData); // > "object"
  let assets = '';
  let buyValue = 0;
  let currentValue = 0;
  let gainLoss = 0;
  {
    mutualFundsData &&
      mutualFundsData.map((value, index, array) => {
        buyValue += parseFloat(value.buy_value);
        currentValue += parseFloat(value.current_value);
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
      });
    gainLoss = currentValue - buyValue;
  }
  // mutualFundsData && mutualFundsData.map(x => console.log(x.asset_type));
  const uniqueMutualFunds = [
    ...(mutualFundsData &&
      mutualFundsData
        .reduce((map, obj) => map.set(obj.asset_type, obj), new Map())
        .values()),
  ];
  // console.log(uniqueMutualFunds);
  const Categorydata = (selectedAsset, selectedPlan) => {
    console.log(selectedAsset);
    //console.log(selectedPlan);
    setCategoryWise(selectedAsset);
  };

  const rendermfsummury = ({item, index}) => (
    <View style={{marginRight: 20, flexDirection: 'row'}}>
      <View
        style={{
          height: 8,
          margin: 6,
          width: 8,
          backgroundColor: PieColors[index % PieColors.length],
        }}
      />
      <Text
        style={{
          margin: 2,
          color: PieColors[index % PieColors.length],
          fontSize: 12,
        }}>
        {item.Category}
      </Text>
      {/* <Text style={{margin: 2, fontSize:10}}>{item.Amount }</Text> */}
    </View>
  );

  // console.log(mutualFundsData);

  function processCategoryDataToDisplay() {
    let totalV = 0;
    mutualFundSummary &&
      mutualFundSummary.map(x => {
        totalV += parseFloat(x.Amount);
      });
    // Filter expenses with "Confirmed" status
    let chartData =
      mutualFundSummary &&
      mutualFundSummary.map(item => {
        // let confirmExpenses = item.current_value.filter(a => a.status == 'C');
        var total = mutualFundSummary.reduce((a, b) => a + b.Amount, 0);

        return {
          name: item.Category,
          y: item.Amount,
          //color: PieColors[index%PieColors.length],
          // id: item.id,
        };
      });

    // filter out categories with no data/expenses
    // let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    // let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData =
      mutualFundSummary &&
      mutualFundSummary.map(item => {
        let percentage = ((item.Amount / totalV) * 100).toFixed(0);
        return {
          label: `${percentage}%`,
          //  label: item.Category,
          y: Number(item.Amount),
          // expenseCount: item.expenseCount,
          //color: PieColors[index%PieColors.length],
          name: item.Category,
          // id: item.id,
        };
      });

    return finalChartData;
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();

    if (Platform.OS == 'ios') {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:COLORS.white
          }}>
       <VictoryPie
            height={250}
            width={250}
            innerRadius={({datum}) => 20}
            colorScale={[
              '#994F14',
              '#DA291C',
              '#FFCD00',
              '#007A33',
              '#EB9CA8',
              '#00a3e0',
              '#7C878E',
              '#8A004F',
              '#000000',
              '#10069F',
              '#00a3e0',
              '#4CC1A1',
              '#a7ce51',
              '#d8e7',
            ]}
            // radius={({ datum }) => 100}
            data={chartData}

          />
        </View>
        <View style={{marginRight: 200}}>

          <FlatList
            data={mutualFundSummary}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => {
              return item.mf_id;
            }}
            renderItem={rendermfsummury}
            style={{paddingBottom: 10, marginBottom: 10}}
          />
        </View>
      </View>
      ); 
      } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:COLORS.white
          }}>
            <Svg>
          <VictoryPie
            height={250}
            width={250}
            innerRadius={({datum}) => 20}
            colorScale={[
              '#994F14',
              '#DA291C',
              '#FFCD00',
              '#007A33',
              '#EB9CA8',
              '#00a3e0',
              '#7C878E',
              '#8A004F',
              '#000000',
              '#10069F',
              '#00a3e0',
              '#4CC1A1',
              '#a7ce51',
              '#d8e7',
            ]}
            // radius={({ datum }) => 100}
            data={chartData}

          /></Svg>
        </View>
        <View style={{marginRight: 200}}>

          <FlatList
            data={mutualFundSummary}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => {
              return item.mf_id;
            }}
            renderItem={rendermfsummury}
            style={{paddingBottom: 10, marginBottom: 10}}
          />
        </View>
      </View>
      );
      }
  }

  const newArray =
    mutualFundsData &&
    mutualFundsData.filter(function (item) {
      return item.asset_type === categoryWise;
    });
  //console.log(newArray);

  const renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => Categorydata(item.asset_type, item.plan)}>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 10,
          borderRadius: 10,
          marginVertical: 5,
          marginHorizontal: 10,
          height: 90,
          width: '95%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: 'https://moneyfrog.in/images/mobile-api-diwali-2018/UltraShortTermFunds.png',
            }}
            style={{
              // tintColor: PieColors[index%PieColors.length],
              width: 35,
              height: 35,
              marginTop: 10,
              // marginLeft: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 12,
              marginTop: 15,
              marginLeft: 10,
              color: PieColors[index % PieColors.length],
              justifyContent: 'center',
            }}>
            {item.asset_type}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              justifyContent: 'center',
              textAlign: 'center',
              color: COLORS.black,
            }}>
            {item.plan_type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItemCategory = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        //goToScreen
        navigation.navigate(navigationStrings.MUTUALFUNDS, {
          data: item,
        });
        // Alert.alert('Total MF Info');
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.main,
          padding: 15,
          borderRadius: 8,
          marginVertical: 5,
          marginHorizontal: 10,
          marginRight: 2,
          height: 160,
          width: '95%',
          shadowColor: COLORS.black,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 1,
          shadowRadius: 0.5,
          elevation: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={imagePath.icBuySell}
            // source={setIcon({item})}
            style={{
              width: '20%',
              height: 40,
              // paddingBottom: 10,
              //overflow: 'hidden',
              // // backgroundColor: 'orange',
              // position: 'relative',
              //alignSelf: 'center',
              // resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              width: '80%',
              ...FONTS.h4,
              marginLeft: 5,
            }}>
            {item.scheme_name}
          </Text>

          {/* <Text style={{justifyContent: 'flex-end'}}>
            NAV: {'\u20B9'} {item.nav}
          </Text> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 11, color: COLORS.grey}}>
            {item.holder_name}
          </Text>

          <Text style={{fontSize: 11, color: COLORS.grey}}>
            NAV {'\u20B9'} {item.nav}
          </Text>

          <Text style={{fontSize: 11, color: COLORS.grey}}>{item.plan}</Text>
        </View>

        <View
          style={{height: 1, width: '100%', backgroundColor: COLORS.lightGrey}}
        />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey}}>Curr. units</Text>
            <Text style={{color: COLORS.black, margin: 5}}>
              {'\u20B9'} {amountToText(item.current_units)}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey}}>Buy Value</Text>
            <Text style={{color: COLORS.black, margin: 5}}>
              {' '}
              {'\u20B9'} {amountToText(item.current_value)}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey}}>Xirr</Text>
            <Text
              style={{
                color: item.xirr < 0 ? COLORS.red : COLORS.main,
                margin: 5,
              }}>
              {item.xirr}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.grey}}>Abs %</Text>
            <Text
              style={{
                color: item.percentage < 0 ? COLORS.red : COLORS.main,
                margin: 5,
                //borderRadius: 25,
                // backgroundColor: item.percentage < 0 ? COLORS.red : COLORS.main,
              }}>
              {item.percentage}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const images = [
    {
      image:
        'https://moneyfrog.in/images/mobile-api-diwali-2018/BannerBalanced.jpg',
    },
    {
      image: 'https://moneyfrog.in/images/mobile-api-diwali-2018/BannerFD.jpg',
    },
    {
      image: 'https://moneyfrog.in/images/mobile-api-diwali-2018/BannerTax.jpg',
    },
  ];

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SkypeIndicator color="#a7ce51" count={5} size={80} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGrey2,
          }}>
          <StatusBar backgroundColor="#a7ce51" barStyle="dark-content" />
          <SafeAreaView style={{marginBottom: 100}}>
            <HeaderComponent
              text="Category Wise MF"
              goBack={() => navigation.goBack()}
            />
            {/* {renderChart()} */}
            <RenderTitle title="MUTUAL FUNDS BASED ON CATEGORY" />

            <View style={{height: 100}}>
              <FlatList
                data={uniqueMutualFunds}
                //numColumns={Math.ceil(uniqueMutualFunds.length / 2)}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => {
                  return item.mf_id;
                }}
                renderItem={renderItem}
                // style={{paddingBottom: 10, marginBottom: 10}}
              />
            </View>

            <RenderTitle title={categoryWise} />

            <View style={{marginBottom: 400}}>
              <FlatList
                scrollEnabled={true}
                data={newArray}
                keyExtractor={(item, index) => {
                  return item.scheme_id;
                }}
                renderItem={renderItemCategory}
                style={{marginTop: 3}}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default ALLMUTUALFUNDS;
