import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/HeaderComponent';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

const ReferAndEarn = ({navigation}) => {
  const CONTENT = {
    tableHead: ['Package', 'Executive', 'Uber'],
    // tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
    tableData: [
      ['Your friend pays', 'Rs. 9999', 'Rs. 24999'],
      ['You get', 'Rs. 1500', 'Rs. 4000'],
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent goBack={() => navigation.goBack()} text="Refer & Earn" />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View>
          <Image
            source={require('../../../assets/Images/referAndEarn/banner_referearn.png')}
            style={{width: '100%', resizeMode: 'contain', height: 170}}
          />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 5,
              color: 'black',
            }}>
            Invite your friends & reward yourself with every subscribed friend.
          </Text>
          <View />
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#888',
              opacity: 0.4,
              height: 2,
              width: 100,
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 5,
              color: 'black',
            }}>
            If you invite 10 friends & they subscribe to our Uber package,you
            earn gift vouchers worth
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 5,
              color: 'black',
            }}>
            10 x 4000 = Rs. 40000
          </Text>

          <View
            style={{
              marginTop: 5,
              padding: 8,
            }}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'grey'}}>
              <Row
                data={CONTENT.tableHead}
                style={{height: 28}}
                textStyle={{textAlign: 'center'}}
              />
              <Rows
                data={CONTENT.tableData}
                style={{height: 28}}
                textStyle={{textAlign: 'justify', marginLeft: 5}}
              />
            </Table>
          </View>

          <View style={{marginVertical: 13}}>
            <TouchableOpacity style={{
              backgroundColor:'#a7ce51',
              height:30,
              alignItems:'center',
              justifyContent:'center',
              margin:10
            }}>
              <Text style={{
              textAlign:'center',
              color:'white',
              fontSize:16
              }}>INVITE FRIEND</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={{color:'#a7ce51'}}> Terms & Conditions </Text>
          </TouchableOpacity>

          {/* <View>
            <Text>Terms & Conditions</Text>
            <Text>
              a) By participating in this Offer, you agree to be bound by the
              Terms and Conditions of this Policy, the Terms of Use, and Privacy
              Policy.{'\n'}
              {'\n'}b) To be eligible for the offer, you must have a valid
              Moneyfrog subscribed account.{'\n'}
              {'\n'}c) Vouchers or scheme reward disbursal time frame – within
              3rd month of customer subscription. For example, if your friend
              subscribes to any of these schemes in Month-1 (Apr),
              voucher/reward will be disbursed in Month-3 (by July end).{'\n'}
              {'\n'}d) Scheme start date: 1st Dec 2018. {'\n'}
              {'\n'}e) Moneyfrog may amend these terms and conditions, reserves
              the right to end any or all offers at its sole discretion, without
              any prior notice to the Customer, and such amended terms and
              conditions will thereupon apply to and be binding on the customer.
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferAndEarn;
