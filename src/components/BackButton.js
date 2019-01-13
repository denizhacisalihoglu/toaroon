import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: Function;
}

class BackButton extends Component<Props> {
  render() {
    const { onPress } = this.props;
    const icon = require('../assets/icons/ic_back_black.png');
    const slop = { top: 5, left: 5, bottom: 5, right: 5 };
    const styles = {
      backButton: {
        flex: 1,
        paddingLeft: 10
      }
    };
    return (
      <TouchableOpacity style={styles.backButton} onPress={onPress} hitSlop={slop}>
        <Image source={icon} />
      </TouchableOpacity>
    );
  }
}


export default BackButton;
