import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import { ChangePassword, Login, Onboarding, PrivacyPolicy, SignUp, TermsNConditions } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../screens/AuthScreens/Context';

const Stack = createNativeStackNavigator()

export default function AuthStack () {

  const [isFirstLaunch, setisFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('AlreadyLaunched').then((Value) => {
      if (Value == null) {
        AsyncStorage.setItem('AlreadyLaunched', 'true');// No need to wait for `setItem` to finish, although you might want to handle errors
        setisFirstLaunch(true);
      } else {
        setisFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  },[]);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName} screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
      <Stack.Screen name={navigationStrings.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={navigationStrings.CHANGEPASSWORD} component={ChangePassword} />
      <Stack.Screen name={navigationStrings.TERMSNCONDITIONS} component={TermsNConditions} />
      <Stack.Screen name={navigationStrings.PRIVACYPOLICY} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}
