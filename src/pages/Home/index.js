import React, { Component } from 'react';
import { ScrollView, View, Modal, AsyncStorage, Text, Alert, Linking, TouchableOpacity } from 'react-native';

import styles from './styles';

import {
  Hamburger,
  MenuAdd,
  Item
} from '../../components';

import ContactsPage from '../Contacts';
import AddPhoto from '../AddPhoto';

const { page, wrapper, header, left, title, right } = styles;

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photoModalVisible: false,
      contactList: [],
      deleteAvailable: false
    };
    this.getContacts();
  }
  onSelect = (contact) => () => {
    this.setState({
      modalVisible: false
    });
    this.setState({
      photoModalVisible: true
    });
    (async () => {
      try {
        const { fullName, phoneNumbers, identifier } = contact;
        const image = !contact.imageDataAvailable ? '' : `data:image/png;base64,${contact.thumbnailImageData}`;
        const user = { fullName, phoneNumbers, identifier, image };
        const contactList = JSON.parse(await AsyncStorage.getItem('contacts')) || [];
        await AsyncStorage.setItem('contacts', JSON.stringify([...contactList, user]));
        this.setState((prev) => ({
          contactList: [...prev.contactList, user]
        }));
      } catch (error) {
        console.log(error.message);
      }
    })();
  }
  getContacts = async () => {
    const contactList = JSON.parse(await AsyncStorage.getItem('contacts')) || [];
    this.setState({ contactList });
  }
  contactModal = (visibility) => () => {
    this.setState({ modalVisible: visibility });
  }
  photoModal = (visibility) => () => {
    this.setState({ photoModalVisible: visibility });
  }
  toggleDelete = () => this.setState(prev => ({ deleteAvailable: !prev.deleteAvailable }))
  callContact = (contact) => {
    try {
      Linking.openURL(`tel:${contact.phoneNumbers[0].stringValue}`).catch(err => console.error('An error occurred', err));
    } catch (error) {
      console.error(error);
    }
  };
  deleteContact = (contact) => {
    Alert.alert(
      'DELETE',
      `${contact.fullName} `,
      [
        { text: 'Cancel', onPress: () => console.info('Deletion was cancelled.') },
        { text: 'Delete', onPress: () => this.deletePermanent(contact) },
      ],
      { cancelable: false }
    );
  }
  deletePermanent = (contact) => {
    const { identifier } = contact;
    const { contactList } = this.state;
    this.setState({
      contactList: [...contactList.filter(c => c.identifier !== identifier)]
    }, async () => {
      const { contactList } = this.state;
      await AsyncStorage.setItem('contacts', JSON.stringify(contactList));
      if (contactList.length < 1) {
        this.setState({ deleteAvailable: false });
      }
    });
  }
  render() {
    const { contactList, deleteAvailable } = this.state;
    return (
      <TouchableOpacity
        underlayColor={'rgba(247,247,247,1)'}
        activeOpacity={1}
        style={page}
        onPress={deleteAvailable ? this.toggleDelete : null}
      >
        <View style={page}>
          <View style={header}>
            <View style={left}>
              <Hamburger />
            </View>
            <Text style={title}>Toaroon</Text>
            <TouchableOpacity style={right}>
              <MenuAdd onPress={this.contactModal(true)} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={wrapper}>
              {
                contactList.length < 1 ?
                  <Item onPress={this.contactModal(true)} />
                  :
                  contactList.map(contact => (
                    <Item
                      contact={contact}
                      key={contact.identifier}
                      onDeletePress={this.deleteContact}
                      onPress={this.callContact}
                      onLongPress={this.toggleDelete}
                      deleteAvailable={deleteAvailable}
                    />
                  ))
              }
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <ContactsPage onSelect={this.onSelect} onClose={this.contactModal(false)} />
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.photoModalVisible}
          >
            <AddPhoto onSelect={this.onSelect} onClose={this.photoModal(false)} />
          </Modal>
        </View>
      </TouchableOpacity>

    );
  }
}
