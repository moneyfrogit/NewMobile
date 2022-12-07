import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {FONTS} from '../../constants/theme';
import {ProgressBar, MD3Colors} from 'react-native-paper';

const deviceWidth = Dimensions.get('window').width;

const MFAAProgressBar = ({value, total, mf}) => {
  // let percent = value / total * 100;

  console.log('value', value);
  console.log('total', total);
  let percentage = (value / total) % 100;
  console.log('percent', percentage);

  return (
    <ProgressBar
      style={{
        height: 12,
        borderRadius: 10,
        width: '100%',
        flex: 0.9,
      }}
      color="rgba(251, 197, 49,0.7)"
      progress={percentage}
    />
  );
};

export default MFAAProgressBar;
