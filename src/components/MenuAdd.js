import React, { Component } from 'react';
import { Image, AsyncStorage, TouchableOpacity } from 'react-native';

const icon = require('../assets/icons/ic_add_black.png');

export default class extends Component {
  state = { visible: false }
  async componentDidMount() {
    const contactList = JSON.parse(await AsyncStorage.getItem('contacts')) || [];
  }
  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={icon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    );
  }
}
