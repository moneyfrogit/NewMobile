import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonComponent = ({ btnText, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
        <Text style={{fontSize: 16, color: 'black'}}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    backgroundColor: '#a7ce51',
    marginTop:10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
