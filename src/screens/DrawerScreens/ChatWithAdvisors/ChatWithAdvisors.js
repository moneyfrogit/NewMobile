import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/HeaderComponent';
import styles from './Styles';

const ChatWithAdvisors = ({navigation}) => {
  return (
      <SafeAreaView style={{
        flex:1
      }}>
      <HeaderComponent goBack={() => navigation.goBack()} text="Chat With Advisors" />
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
            Would you like to Chat with Advisors? 
        </Text>
        <TouchableOpacity
          onPress={() => console.log('start rating counter')}
          activeOpacity={0.6}
          style={styles.button}>
          <Text style={styles.TextStyle}>Advisor</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
  );
};

export default ChatWithAdvisors;
