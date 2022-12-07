import {
  StyleSheet,
  Image,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderComponent';
import ButtonComponent from '../../components/ButtonComponent';
import navigationStrings from '../../constants/navigationStrings';
import Readers from '../Readings/Readers';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import HTML from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import formatDate from '../../utils/DateTime';
import { COLORS } from '../../constants/theme';

const ReadingsScreen = props => {
  // const {data} = route.params;
  const navigation = useNavigation();
  // console.log(props);
  const contentWidth = useWindowDimensions().width;
  const tagsStyles = {
    a: {
      textDecorationLine: 'none',
    },
    p: {
      color: COLORS.black
    },
    
  };

  if (!props.data.post) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{marginHorizontal: 24, marginBottom: 60}}>
     <HeaderComponent text="Blog" goBack={() => navigation.goBack()}/>
      <ScrollView styles={{}}>
        {/* <Text>Post ID: {props.route.params.id}</Text> */}

        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign:'center',color:COLORS.black}}>
          {props.data.post.title}
        </Text>

        {/* <Text>{props.data.post.content}</Text> */}
        <Image
          source={{uri: props.data.post.featuredImage.node.sourceUrl}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginBottom: 5,
            marginTop: 10,
          }}
        />
        <Text style={{fontSize: 14, textAlign:'right', marginRight:5, color:COLORS.black}}>
          {formatDate(props.data.post.date)}
        </Text>
        <HTML
          source={{html: props.data.post.content}}
          tagsStyles={tagsStyles}
          contentWidth={contentWidth}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const getPostByID = gql`
  query getPostbyID($id: ID!) {
    post(id: $id) {
      slug
      content
      title
      date
      featuredImage {
        node {
          sourceUrl(size: MEDIUM)
        }
      }
    }
  }
`;

export default graphql(getPostByID, {
  options: props => {
    const id = props.route.params.id;

    return {
      variables: {
        id,
      },
    };
  },
})(ReadingsScreen);
