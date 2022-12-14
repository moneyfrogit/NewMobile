import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTogglePasswordVisibility } from '../helper/useTogglePasswordVisibility';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  // const [passwordVisibility, setPasswordVisibility] = useState(true);
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={18} color="#000000" />
      </View>
      {/* <View>
      <MaterialCommunityIcons name={iconTipe} size={25} color="#666" />
      </View> */}
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        // right={<TextInput.Icon name={passwordVisibility ? "eye" : "eye-off"} onPress={() => setPasswordVisibility(!passwordVisibility)} />}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 3,
    width: '100%',
    height: windowHeight / 20,
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    // fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});