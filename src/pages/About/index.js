import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

const { modal, title } = styles;

class About extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <ScrollView style={modal}>
        <View>
          <Text style={title}>About Toaroon</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default About;
