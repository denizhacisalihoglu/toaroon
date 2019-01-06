import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, Image, View } from 'react-native';

const activeIcon = require('../assets/icons/ic_add_black.png');
const nonActiveIcon = require('../assets/icons/ic_add_black.png');
const deleteIcon = require('../assets/icons/ic_remove_gray.png');
const nopicture = require('../assets/icons/nopicture.png');

type Props = {};
class Item extends Component<Props> {
  state = {
    data: [],
    contactList: [],
    deleteAction: false
  };
  render() {
    const icon = this.props.active ? activeIcon : nonActiveIcon;
    const { contact = false, onLongPress, deleteAvailable } = this.props;
    const { deleteAction } = this.state;
    const image = contact.image ? { uri: contact.image } : nopicture;
    const deleteContact = (contact) => () => {
      this.props.onDeletePress(contact);
    };
    const callContact = (contact) => () => {
      this.props.onPress(contact);
    };
    return (
      <View>
        <TouchableOpacity
          style={[styles.deleteButton, deleteAvailable ? styles.shown : styles.hidden]}
          onPress={deleteContact(contact)}
        >
          <Image source={deleteIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <TouchableHighlight
          style={[styles.item, !contact.image ? styles.image : '']}
          onPress={callContact(contact)}
          onLongPress={onLongPress}
        >
          <View style={styles.imageContainer}>
            <Image source={contact ? image : activeIcon} style={contact.image ? styles.image : styles.icon} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Item;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E8E8E8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: Math.round(width + height) / 2,
    marginVertical: 10,
    position: 'relative',
    marginHorizontal: width * .015
  },
  image: {
    width: width * 0.45,
    height: width * 0.45
  },
  icon: {
    width: 50,
    height: 50
  },
  deleteButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 30,
    top: 15,
    right: 15,
    zIndex: 9
  },
  shown: {
    display: 'flex'
  },
  hidden: {
    display: 'none'
  }

});