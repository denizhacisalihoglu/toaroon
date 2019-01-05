import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class About extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <ScrollView style={styles.modal}>
        <View>
          <Text style={styles.title}>About Toaroon</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    paddingTop: 50
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15
  }
});

export default About;
