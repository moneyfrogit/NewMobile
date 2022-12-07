import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import HeaderComponent from '../../components/HeaderComponent';
import {SkypeIndicator} from 'react-native-indicators';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import navigationStrings from '../../constants/navigationStrings';
import imagePath from '../../constants/imagePath';
import { COLORS } from '../../constants/theme';
import { Divider } from 'react-native-paper';
import DashboardSectionDivider from '../../utils/Divider';
import formatDate from '../../utils/DateTime';

const Readers = ({navigation}) => {
  // let Date = new Date(post.node.date);
  // console.log(Date);
  return (
    <Query
      query={gql`
        {
          posts {
            edges {
              node {
                slug
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                id
                title
                date
              }
            }
          }
        }
      `}>
      {({loading, error, data}) => {
        console.log(data);
        if (loading) {
          return (
            <SafeAreaView>
              <HeaderComponent text="Readings" />
              <View>
                <Text>Loading...</Text>
              </View>
            </SafeAreaView>
          );
        }
        return (
          <SafeAreaView>
            <HeaderComponent text="Readings" />
            <ScrollView style={{padding: 10, marginBottom: 100}}>
              {data.posts.edges.map((post, key) => {
                return (
                  <View key={key} style={{marginBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems:'center'
                      }}>
                      <Text style={{fontSize: 18, marginLeft:10, color:COLORS.black}}>
                        {post.node.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(
                            navigationStrings.READINGSSCREEN,
                            {
                              id: post.node.id,
                            },
                          );
                        }}>
                        <Image
                          source={imagePath.ic_arrowright}
                          style={{
                            width: 30,
                            height: 30,
                            paddingBottom: 10,
                            marginLeft: 5,
                            tintColor: COLORS.darkGray,
                            //overflow: 'hidden',
                            //backgroundColor: 'orange',
                            // position: 'relative',
                            alignSelf: 'flex-end',
                            // resizeMode: 'contain',
                          }}
                        />
                        {/* <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                          Read More
                        </Text> */}
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{
                        uri: post.node.featuredImage.node.sourceUrl,
                      }}
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 5,
                        marginBottom: 5,
                        marginTop: 10,
                      }}
                    />
                     <Text style={{fontSize: 12, textAlign:'right',color:COLORS.black}}>
                    {/* { new Date(post.node.date)} */}
                     {formatDate(post.node.date)}
                        </Text>

                        <DashboardSectionDivider/>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        );
      }}
    </Query>
  );
};

export default Readers;
