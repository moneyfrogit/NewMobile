import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  Platform,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import HeaderComponent from '../../../components/HeaderComponent';
import styles from './Styles';
import Dots from 'react-native-dots-pagination';

const Demo = ({navigation}) => {
  const [active, setActive] = useState(1);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderComponent goBack={() => navigation.goBack()} text="Demo" />
      <PagerView
        style={styles.pagerView}
        showPageIndicator={true}
        initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            style={styles.image}
            source={require('../../../assets/Images/Demo/welcome_two.jpg')}
          />
          {/* <Text>First page</Text> */}
          {/* <Text>Swipe ➡️</Text> */}
        </View>
        <View style={styles.page} key="2">
        <Image
            style={styles.image}
            source={require('../../../assets/Images/Demo/welcome_two.jpg')}
          />
        </View>
        <View style={styles.page} key="3">
        <Image
            style={styles.image}
            source={require('../../../assets/Images/Demo/welcome_three.jpg')}
          />
        </View>
        <View style={styles.page} key="4">
        <Image
            style={styles.image}
            source={require('../../../assets/Images/Demo/welcome_four.jpg')}
          />
        </View>
        <View style={styles.page} key="5">
        <Image
            style={styles.image}
            source={require('../../../assets/Images/Demo/welcome_five.jpg')}
          />
        </View>
      </PagerView>
      {/* <Dots activeColor={'black'} length={3} active={setActive} /> */}
    </SafeAreaView>
  );
};

export default Demo;
