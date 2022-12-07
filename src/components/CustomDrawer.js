import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import navigationStrings from '../constants/navigationStrings';
import {Image, View, Text, StyleSheet, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../screens/AuthScreens/Context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../constants/theme';
import imagePath from '../constants/imagePath';

export function CustomDrawer(props) {
  const {signOut} = React.useContext(AuthContext);
  const {navigation} = props;


  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: 0, backgroundColor: COLORS.grey2}}>
        <ImageBackground
          //source={require('../assets/Images/green-background-with-fading-square-and-dots-free-vector.jpeg')}
          style={{padding: 25, paddingBottom: 5, marginLeft: 1, marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity                   
            onPress={() => {
                    navigation.navigate(navigationStrings.USERPROFILE, {
                      // data: item,
                    });
                  }}>
              <Image
                //source={require('../assets/Images/Drawer/profile_pic_generic.png')}
                // source={imagePath.ic_profile}
                source={{
                  uri: 'https://moneyfrog.in/images/profile_img.gif',
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                margin: 20,
                marginTop: 30,
                alignItems:'center'
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight:'bold'}}>User Name</Text>

              {/* <FontAwesome5 name="mobile" size={14} color="#fff" /> */}
              <Text style={{color: 'black', fontSize: 14,}}>
                9876543210
              </Text>
            </View>
          </View>
        </ImageBackground>
        {/* <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        /> */}
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 1}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 15,
          marginBottom: 10,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        <TouchableOpacity onPress={() => signOut()}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{resizeMode: 'contain', width: 24, height: 20}}
              source={imagePath.ic_logout}
            />
            <Text style={{color: 'black', marginLeft: 5, textAlign: 'center'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{color: 'grey', textAlign: 'center', marginTop: 10}}>
          Current Version : 7.0.0
        </Text>
      </View>
    </View>
  );
}
export default CustomDrawer;
