import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: Function;
}

class BackButton extends Component<Props> {
  render() {
    const { onPress } = this.props;
    const icon = require('../assets/icons/ic_close_black.png');
    const slop = { top: 5, left: 5, bottom: 5, right: 5 };
    const styles = {
      closeButton: {
        flex: 1,
        paddingRight: 10
      }
    };
    return (
      <TouchableOpacity style={styles.closeButton} onPress={onPress} hitSlop={slop}>
        <Image source={icon} />
      </TouchableOpacity>
    );
  }
}


export default BackButton;
