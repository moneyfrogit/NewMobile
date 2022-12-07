import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Touchable,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {SkypeIndicator} from 'react-native-indicators';
import {VictoryPie} from 'victory-native';
import LinearGradient from 'react-native-linear-gradient';
import {Svg} from 'react-native-svg';
import HeaderComponent from '../../components/HeaderComponent';
import RenderTitle from '../../components/RenderTitle';
import navigationStrings from '../../constants/navigationStrings';
import {COLORS, FONTS} from '../../constants/theme';
import imagePath from '../../constants/imagePath';
import {amountToText} from '../../utils/Amounts';
import MutualFundComponent from '../../components/BuySell/MutualFundComponent';
import {Button} from 'react-native-paper';
import {List} from 'react-native-paper';

export default function BuySellScreen({navigation, route}) {
  const [userID, setUserID] = useState('');
  const [userToken, setUserToken] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {data, loading} = state;
  const [sampleData, setSampleData] = useState('');

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      // setUserID(userID);
      // console.log(userID);
      const userToken = await AsyncStorage.getItem('userToken');
      // setUserToken(userToken);
      // console.log(userToken);
      setState({data: [], loading: true});
      axios
        .get(
          'https://moneyfrog.in/financial-page-api/' +
            userID +
            '/mutual_funds?login_token=' +
            userToken,
        )
        .then(response => response.data.mutual_funds)
        .then(data => {
          console.log(data);

          setState({data, loading: false}); // set only data
          setSampleData(data);
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

  //   function filterData(data, ) {
  //     return data.filter((x) => (x.holder_name === 'Low Duration'));
  // }

  // const result = filterData(data);
  // console.log('result', result);

  //   const uniqueMutualFunds = [
  //     ...(data &&
  //       data
  //         .filter((map, obj) => map.filter(obj.holder_name, obj), new Map())
  //         .values()),
  //   ];
  // console.log('uniqueMutualFunds', uniqueMutualFunds);

  function handleSort() {
    const sortedData = [...data].sort((a, b) => {
      return a.first > b.first ? 1 : -1;
    });
    setSampleData(sortedData);
  }
  //console.log('sample Data', sampleData);

  let buyValue = 0;
  let currentValue = 0;
  let gainLoss = 0;
  let mfIds = [];
  {
    data &&
      data.map((value, index, array) => {
        buyValue += parseFloat(value.buy_value);
        currentValue += parseFloat(value.current_value);
        // console.log(value.asset_type);
        // assets = value.asset_type;
        // console.log(assets);
        //mfIds.push(value.mf_id);
      });
    gainLoss = currentValue - buyValue;
    // mfIds.push(value.mf_id);
  }

  // let dataatata = sampleData.filter(
  //   element => element.brought_thru === 'Mfrog-Direct');
  // console.log('njidsncisdns',dataatata);
  //   const uniqueMutualFunds = [
  //     ...(sampleData &&
  //       sampleData
  //         .reduce((map, obj) => map.set(obj.amc, obj), new Map())
  //         .values()),
  //   ];
  //  console.log('uniqueMutualFunds', uniqueMutualFunds);
  // console.log('cur v', currentValue);
  // Function that returns filtered asset_type and percentage from API for Pie Chart

  // function processCategoryDataToDisplay() {
  //   // Filter expenses with "Confirmed" status
  //   let chartData = categories.map(item => {
  //     let confirmExpenses = item.expenses.filter(a => a.status == 'C');
  //     var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

  //     return {
  //       name: item.name,
  //       y: total,
  //       expenseCount: confirmExpenses.length,
  //       color: item.color,
  //       id: item.id,
  //     };
  //   });

  //   // filter out categories with no data/expenses
  //   let filterChartData = chartData.filter(a => a.y > 0);

  //   // Calculate the total expenses
  //   let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

  //   // Calculate percentage and repopulate chart data
  //   let finalChartData = filterChartData.map(item => {
  //     let percentage = ((item.y / totalExpense) * 100).toFixed(0);
  //     return {
  //       label: `${percentage}%`,
  //       y: Number(item.y),
  //       expenseCount: item.expenseCount,
  //       color: item.color,
  //       name: item.name,
  //       id: item.id,
  //     };
  //   });

  //   return finalChartData;
  // }

  // const sampleedata = {
  //   "clean": 4,
  //   "haircut": 3,
  //   "wash": 1,
  // };

  // const arr = new Array();

  // for (const [key, value] of Object.entries(sampleedata)) {
  //   arr.push({x:key,y:value});
  // }

  //console.log(arr)

  useEffect(() => {
    fetchAPI();
  }, []); // use `[]` to avoid multiple side effect

  const filterdData = text // based on text, filter data and use filtered data
    ? data.filter(item => {
        const itemData = item.scheme_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data; // on on text, u can return all data
  //console.log(data);

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  setIcon = ({item}) => {
    let mfIcon;
    switch (item.amc) {
      case 'Aditya Birla Sun Life Mutual Fund':
        mfIcon = imagePath.ic_aditya_birla_mutual_fund;
        break;
      case 'Axis Mutual Fund':
        mfIcon = imagePath.ic_axis_mutual_fund;
        break;
      case 'DSP Mutual Fund':
        mfIcon = imagePath.ic_dsp;
        break;
      case 'ICICI Prudential Mutual Fund':
        mfIcon = imagePath.ic_icici;
        break;

      case 'Baroda BNP Paribas Mutual Fund':
        mfIcon = imagePath.ic_bnp_paribhas;
        break;
      case 'BOI AXA Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Canara Robeco Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'Escorts Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Franklin Templeton Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'HDFC Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'ING Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'JM Financial Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Kotak Mahindra Mutual Fund':
        mfIcon = imagePath.ic_kotak;
        break;
      case 'LIC Mutual Fund':
        mfIcon = imagePath.ic_arrowright;
        break;
      case 'Principal Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Nippon India Mutual Fund':
        mfIcon = imagePath.ic_Nippon;
        break;

      case 'SBI Mutual Fund':
        mfIcon = imagePath.ic_SBI;
        break;
      case 'Sundaram Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Tata Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Union Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'UTI Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'BNP Paribas Mutual Fund':
        mfIcon = imagePath.ic_bnp_paribhas;
        break;
      case 'DHFL Pramerica Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Edelweiss Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Quant Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'HSBC Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'IDBI Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'IDFC Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'L&T Mutual Fund':
        mfIcon = imagePath.ic_LANDT;
        break;

      case 'Quantum Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Invesco Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Sahara Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Taurus Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'ING Vysya Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Deutsche Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'JPMorgan Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Mirae Asset Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'PineBridge Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Indiabulls Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Morgan Stanley Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Motilal Oswal Mutual Fund':
        mfIcon = imagePath.ic_Motilal;
        break;

      case 'Goldman Sachs Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'IIFL Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Essel Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'PPFAS Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'PGIM India Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Shriram Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'IIFCL Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'IL&FS Mutual Fund (IDF)':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'Pramerica Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Religare Invesco Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Mahindra Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Reliance Nippon Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'ITI Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Nippon Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Navi Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
      case 'Mahindra Manulife Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;

      case 'WhiteOak Capital Mutual Fund':
        mfIcon = imagePath.ic_anotherback;
        break;
    }
    return mfIcon;
  };

  const goBak = () => {
    if (navigation.canGoBack()) {
      navigation.navigate(navigationStrings.HOMESCREEN);
    }
  };
  //alert(item.mf_id)}
  const renderMutualFunds = ({item, index}) => (
    // <TouchableOpacity onPress={() =>{this.props.navigation.navigate('finalsDet', {item})} }>
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
          flex: 1,
          backgroundColor: COLORS.white,
          borderColor: COLORS.main,
          padding: 15,
          borderRadius: 8,
          marginVertical: 5,
          marginRight: 2,
          height: 160,
          width: '95%',
          marginHorizontal: 10,
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
            flex:1
          }}>
          {/* <View style={{}}> */}
          <View style={{
            
          }}>
            <Image
              source={setIcon({item})}
              style={{
                flex: 1,
                width: 50,
                height: 40,
                // marginTop: 10,
                //paddingBottom: 10,
              }}
            />
          </View>
          {/* </View> */}
          <View style={{
            flex:1
          }}>
            <Text
              style={{
                width: '95%',
                fontWeight:'bold',
                marginLeft: 5,
                color: COLORS.black,
              }}>
              {item.scheme_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 11, color: COLORS.darkGray}}>
            {item.holder_name}
          </Text>

          <Text style={{fontSize: 11, fontWeight:'bold', color: COLORS.darkGray}}>
            NAV {'\u20B9'} {item.nav}
          </Text>

          <Text style={{fontSize: 11, color: COLORS.darkGray}}>{item.plan}</Text>
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
            <Text style={{color: COLORS.darkGray}}>Curr. units</Text>
            <Text style={{color: COLORS.black, fontWeight:'bold', margin: 5}}>
              {'\u20B9'} {amountToText(item.current_units)}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.darkGray}}>Buy Value</Text>
            <Text style={{color: COLORS.black, fontWeight:'bold', margin: 5}}>
              {' '}
              {'\u20B9'} {amountToText(item.current_value)}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.darkGray}}>Xirr</Text>
            <Text
              style={{
                color: item.xirr < 0 ? COLORS.red : COLORS.main,
                margin: 5, fontWeight:'bold',
              }}>
              {item.xirr}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.darkGray}}>Abs %</Text>
            <Text
              style={{
                color: item.percentage < 0 ? COLORS.red : COLORS.main,
                margin: 5, fontWeight:'bold',
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

  return (
    <SafeAreaView
      style={{
        paddingBottom: 10,
      }}>
      <View style={{}}>
        {loading === false ? (
          <View style={styles.MainContainer}>
            <HeaderComponent text="Mutual Funds" goBack={() => goBak()} />

            <View>
              <MutualFundComponent
                BuyV={amountToText(buyValue)}
                CurrV={amountToText(currentValue)}
                Gain={amountToText(gainLoss)}
              />
            </View>

            {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 80,
                  width: '80%',
                  backgroundColor: COLORS.main,
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(navigationStrings.ALLMUTUALFUNDS, {
                      // data: item,
                    });
                  }}>
                  <Image
                    source={imagePath.ic_arrowright}
                    style={{
                      width: 30,
                      height: 30,
                      paddingBottom: 10,
                      marginLeft: 5,
                      tintColor: COLORS.white,
                      alignSelf: 'flex-end',
                    }}
                  />
                </TouchableOpacity>
              </View> */}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <RenderTitle title="ALL MUTUAL FUNDS" />
              </View>
              {/* <View style={{marginTop:3}}>
                <Button 
                color='#a7ce51'
                onPress={HandleFilter(Low Duration)}>Filter</Button>
              </View> */}
              {/* <View style={{marginTop:3}}>
                <Button 
                color='#a7ce51'
                onPress={handleSort}>Sort A-Z</Button>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                backgroundColor: '#d9dbda',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginHorizontal: 10,
              }}>
              <Feather
                name="search"
                size={20}
                color="black"
                style={{marginLeft: 10, marginRight: 10}}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={text => setText(text)}
                value={text}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholder="Search Scheme Name Here"
              />
            </View>
            
            {/* <View style={{paddingTop:20}}> */}
            <FlatList
              data={filterdData}
              keyExtractor={(item, index) => index.toString()}
              // ItemSeparatorComponent={itemSeparator}
              renderItem={renderMutualFunds}
              // {({ item }) => (

              //   <Text style={styles.row}>{item.Country}</Text>

              // )}
              style={{marginTop: 10}}
            />
            {/* </View> */}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: 350,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SkypeIndicator color="#a7ce51" count={5} size={80} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    // paddingTop: 50,
    justifyContent: 'center',
    //flex: 1,
    // margin: 5,
    // height: 800,
    marginBottom: 400,
  },

  // row: {
  //   fontSize: 18,
  //   padding: 12,
  // },

  textInput: {
    textAlign: 'left',
    height: 42,
    color: COLORS.black,
    // borderWidth: 1,
    // borderColor: '#009688',
    // borderRadius: 8,
    // backgroundColor: COLORS.grey,
  },
});

//Reference = https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
