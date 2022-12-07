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

const KidsDetails = ({navigation}) => {
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
        '/kids';
      axios
        .get(URL)
        .then(response => response.data.kids_details)
        .then(dataa => {
          setState({dataa, loading: false}); // set only data
          console.log('kids Profile Overview Data', dataa);
          // setbankDetails(dataa.bank_details);
          // console.log('bank Data', bankDetails);
          // setDematDetails(dataa.demat_details);
          // console.log('Demat Data', dematDetails);
          // setPersonalDetails(dataa.personal_details);
          // console.log('Personal Details', personalDetails);
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

  const renderkidsDetails = ({item, index}) => (
    <View>
      <List.Accordion
        title={item.kids_name}
        description={item.kids_name}
        left={props => (
          <List.Icon {...props} icon="account-child-circle" color="#a7ce51" />
        )}>
        <List.Item
          title="DOB"
          titleStyle={{color: 'black'}}
          descriptionStyle={{color: 'grey'}}
          description={item.kids_birthdate}
        />
        <List.Item
          title="Height in cm"
          description={item.height_cm}
        />
        <List.Item title="Weight" description={item.weight} />
        <List.Item
          title="BMI"
          description={item.bmi}
        />
        <List.Item
          title="Gender"
          description={item.kids_gender}
        />
        <List.Item title="Education" description={item.kids_edu} />
        <List.Item
          title="Aadhar No"
          description={item.aadhar_no}
        />
        <List.Item
          title="PAN No"
          description={item.kids_pancard_no}
        />
      </List.Accordion>
    </View>
  );

  // kids_can
  // kids_edu
  // kids_ucc
  // kids_iin
  // kids_name

  // const renderBankDetails = ({item, index}) => (
  //   <View>
  //     <List.Accordion
  //       title="Bank Details"
  //       description="Item description"
  //       left={props => <List.Icon {...props} icon="bank" color="#a7ce51" />}>
  //       <List.Item
  //         title="Bank Ac No"
  //         titleStyle={{color: 'black'}}
  //         descriptionStyle={{color: 'grey'}}
  //         description={item.bank_ac_no}
  //       />
  //       <List.Item
  //         title="Bank Branch Address"
  //         description={item.bank_branch_address}
  //       />
  //       <List.Item title="Bank Name" description={item.bank_name} />
  //       <List.Item title="IFSC" description={item.ifsc_code} />
  //       <List.Item title="MICR" description={item.micr_code} />
  //     </List.Accordion>
  //   </View>
  // );

  // const renderPersonalDetails = ({item, index}) => (
  //   <View>
  //     <List.Accordion
  //       title="Personal Details"
  //       description="Item description"
  //       left={props => <List.Icon {...props} icon="account" color="#a7ce51" />}>
  //       <List.Item
  //         title="Name"
  //         titleStyle={{color: 'black'}}
  //         descriptionStyle={{color: 'grey'}}
  //         description={item.name}
  //       />
  //       <List.Item title="Surname" description={item.surname} />
  //       <List.Item title="DOB" description={item.dob} />
  //       <List.Item title="Maritial Status" description={item.maritial_status} />
  //       <List.Item title="Contact No" description={item.contact_number} />
  //       <List.Item title="Email ID" description={item.email_id} />
  //       <List.Item title="PAN No" description={item.pancard_no} />
  //       <List.Item title="Address" description={item.address} />
  //       <List.Item title="City" description={item.city} />
  //       <List.Item title="Pincode" description={item.pincode} />
  //       <List.Item title="State" description={item.state} />
  //       <List.Item title="Company" description={item.company_name} />
  //       <List.Item title="Designation" description={item.designation} />
  //       <List.Item title="Occupation" description={item.occupation} />
  //       <List.Item title="Smoker" description={item.smoker} />
  //       <List.Item title="Medical History" description={item.medical_hist} />
  //       <List.Item title="Alcohol Consumption" description={item.alcohol} />
  //       <List.Item title="Retirement Age" description={item.retire_age} />
  //     </List.Accordion>
  //   </View>
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        text="Kid's Details"
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1, marginBottom: 60}} nestedScrollEnabled>
        {/* <Text style={{color:COLORS.black}}>{dematDetails.demat_ac_no}</Text> */}

        <FlatList
          data={dataa}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderkidsDetails}
        />
        {/* <FlatList
          data={bankDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBankDetails}
        />

        <FlatList
          data={personalDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPersonalDetails}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default KidsDetails;
