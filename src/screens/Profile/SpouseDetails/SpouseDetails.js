import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import HeaderComponent from '../../../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {List} from 'react-native-paper';
import {COLORS} from '../../../constants/theme';

const SpouseDetails = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [state, setState] = useState({data: [], loading: false}); // only one data source
  const {dataa, loading} = state;
  const [bankDetails, setbankDetails] = useState('');
  const [dematDetails, setDematDetails] = useState('');
  const [personalDetails, setPersonalDetails] = useState('');
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setUserID(userID);
      setState({dataa: [], loading: true});
      const URL =
        'https://moneyfrog.in/api_controller/profile_page/' +
        userID +
        '/spouse';
      axios
        .get(URL)
        .then(response => response.data)
        .then(dataa => {
          setState({dataa, loading: false}); // set only data
          console.log('Spouse Profile Overview Data', dataa);
          setbankDetails(dataa.bank_details);
          console.log('Spouse bank Data', bankDetails);
          setDematDetails(dataa.demat_details);
          console.log('Spouse Demat Data', dematDetails);
          setPersonalDetails(dataa.spouse_details);
          console.log('Spouse Personal Details', personalDetails);
        })
        .catch(function (error) {
          // handle error
          console.log('spouse Overview error', error);
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

  const renderdematDetails = ({item, index}) => (
    <View>
      <List.Accordion
        title="Demat Details"
        description="Item description"
        left={props => (
          <List.Icon {...props} icon="stack-exchange" color="#a7ce51" />
        )}>
        <List.Item
          title="Demat Ac No"
          titleStyle={{color: 'black'}}
          descriptionStyle={{color: 'grey'}}
          description={item.demat_ac_no}
        />
        <List.Item
          title="DP Name"
          description={item.dp_name}
        />
        <List.Item title="NSDL/CDSL" description={item.nsdl_cdsl} />
      </List.Accordion>
    </View>
  );

  const renderBankDetails = ({item, index}) => (
    <View>
      <List.Accordion
        title="Bank Details"
        description="Item description"
        left={props => <List.Icon {...props} icon="bank" color="#a7ce51" />}>
        <List.Item
          title="Bank Ac No"
          titleStyle={{color: 'black'}}
          descriptionStyle={{color: 'grey'}}
          description={item.bank_ac_no}
        />
        <List.Item
          title="Bank Branch Address"
          description={item.bank_branch_address}
        />
        <List.Item title="Bank Name" description={item.bank_name} />
        <List.Item title="IFSC" description={item.ifsc_code} />
        <List.Item title="MICR" description={item.micr_code} />
      </List.Accordion>
    </View>
  );

  const renderPersonalDetails = ({item, index}) => (
    <View>
      <List.Accordion
        title="Spouse Details"
        description="Item description"
        left={props => <List.Icon {...props} icon="account" color="#a7ce51" />}>
        <List.Item
          title="Name"
          titleStyle={{color: 'black'}}
          descriptionStyle={{color: 'grey'}}
          description={item.wifes_name}
        />
        {/* <List.Item title="Surname" description={item.surname} /> */}
        <List.Item title="Spouse DOB" description={item.wifes_birthdate} />
        {/* <List.Item title="Maritial Status" description={item.maritial_status} /> */}
        <List.Item title="Contact No" description={item.spouse_mobile} />
        <List.Item title="Email ID" description={item.spouse_email} />
        <List.Item title="PAN No" description={item.spouse_pancard} />
        {/* <List.Item title="Address" description={item.address} /> */}
        {/* <List.Item title="City" description={item.city} />
        <List.Item title="Pincode" description={item.pincode} /> */}
        {/* <List.Item title="State" description={item.state} /> */}
        <List.Item title="Company" description={item.spouse_company_name} />
        <List.Item title="Designation" description={item.spouse_designation} />
        <List.Item title="Occupation" description={item.spouse_occupation} />
        <List.Item title="Smoker" description={item.smoker} />
        <List.Item title="Medical History" description={item.medical_hist} />
        {/* medical_hist_yes */}
        <List.Item title="Alcohol Consumption" description={item.alcohol} />
        <List.Item title="Retirement Age" description={item.spouse_retire_age} />
      </List.Accordion>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        text="Spouse Details"
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1, marginBottom: 60}} nestedScrollEnabled>
        {/* <Text style={{color:COLORS.black}}>{dematDetails.demat_ac_no}</Text> */}

        <FlatList
          data={dematDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderdematDetails}
        />
        <FlatList
          data={bankDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBankDetails}
        />

        <FlatList
          data={personalDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPersonalDetails}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpouseDetails;
