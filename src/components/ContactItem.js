import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';

// var base64ImageUri = 'data:image/png;base64,' + contact.thumbnailImageData;
const nopicture = require('../assets/icons/nopicture.png');

class ContactItem extends Component {
  render() {
    const { contact, onPress } = this.props;
    const image = !contact.imageDataAvailable ? nopicture : { uri: `data:image/png;base64,${contact.thumbnailImageData}` };
    return (
      <TouchableOpacity onPress={onPress(contact)}>
        <View style={styles.item}>
          <Image source={image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.text}>{contact.fullName}</Text>
            <Text style={styles.phone}>{contact.phoneNumbers ? contact.phoneNumbers[0].stringValue : ''}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ContactItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10
  },
  text: {
    display: 'flex',
  },
  phone: {
    fontSize: 10,
    display: 'flex',
  }
});
