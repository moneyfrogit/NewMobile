import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import imagePath from '../../constants/imagePath';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Let's get Started</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#a7ce51',
            image: <Image source={imagePath.ic_onboarding1} />,
            title: 'Moneyfrog Offers you best service for your financial goals',
            subtitle: "It's very easy to use, covers all of the MF houses",
          },
          {
            backgroundColor: '#a7ce51',
            image: <Image source={imagePath.ic_onboarding2} />,
            title: 'Suits your financial goals',
            subtitle: ' It is easy to find a mutual fund that matches your income, time horizon, investment goals and risk appetite',
          },
          {
            backgroundColor: '#a7ce51',
            image: <Image source={imagePath.ic_onboarding3} />,
            title: 'Quick and hassle-free process',
            subtitle: "You can start with one mutual fund and slowly diversify across funds to build your portfolio",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});