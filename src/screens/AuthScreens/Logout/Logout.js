import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/HeaderComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import { AuthContext } from '../Context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Logout = () => {

  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <SafeAreaView>
        <HeaderComponent text="Logout"/>
        <TouchableOpacity onPress={() => {signOut()}}>
        <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Logout;
