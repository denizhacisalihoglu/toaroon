import React, { Component } from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';

import styles from './styles';

import {
  BackButton
} from '../../components';

const { modal, header, left, right, title, content, paragraph, hyperlink } = styles;

class About extends Component {
  render() {
    return (
      <ScrollView style={modal}>
        <View style={header}>
          <View style={left}>
            <BackButton
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>
          <Text style={title}>About Toaroon</Text>
          <Text style={right} />
        </View>
        <View style={content}>
          <Text style={paragraph}>
            Many of us have grandparents or old parents with reading difficulties. Thus they have trouble to use new generation mobile phones.
            Do they need? Indeed they do. Actually it is my opinion.
            You do not have to agree with me. But I know you do.
            When you read this paragraph you started to imagine your grandma within a big big glasses and trying to call you on WhatsApp.
            I know it. But I wonder if she did achieve this?
          </Text>
          <Text style={paragraph}>
            Let's see how this idea popped up?
            Read this article here:
          </Text>
          <Text
            style={hyperlink}
            onPress={() => Linking.openURL('https://medium.com/@dhcs')}
          >
            https://medium.com/@dhcs
          </Text>
        </View>

      </ScrollView>
    );
  }
}

export default About;
