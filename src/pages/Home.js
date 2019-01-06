import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Modal, AsyncStorage, Text, Alert, Linking, TouchableOpacity, TouchableHighlight } from 'react-native';


import Hamburger from '../components/Hamburger';
import MenuAdd from '../components/MenuAdd';
import Item from '../components/CircleItem';
import ContactsPage from './ContactsPage';

type Props = {};
const nopicture = require('../assets/icons/nopicture.png');

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      contactList: [],
      deleteAvailable: false
    };
    this.getContacts();
  }
  onSelect = (contact) => () => {
    this.setState({
      modalVisible: false
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
  toggleDelete = () => this.setState(prev => ({ deleteAvailable: !prev.deleteAvailable }))
  callContact = (contact) => {
    Linking.openURL(`tel:${contact.phoneNumbers[0].stringValue}`).catch(err => console.error('An error occurred', err));
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
      <TouchableHighlight
        underlayColor={'rgba(247,247,247,1)'}
        style={styles.page}
        onPress={deleteAvailable && this.toggleDelete}
      >
        <View style={styles.page}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Hamburger />
            </View>
            <Text style={styles.title}>Toaroon</Text>
            <TouchableOpacity style={styles.right}>
              <MenuAdd onPress={this.contactModal(true)} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.wrapper}>
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
        </View>
      </TouchableHighlight>

    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  page: {
    flex: 1,
    width,
    height,
    backgroundColor: '#F7F7F7',
    // padding: width * .02
  },
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: width * .02
  },
  welcome: {
    fontSize: 20,
    paddingTop: 50,
    textAlign: 'center',
    fontWeight: '500',
    color: '#101010'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    top: 0,
    paddingTop: 50,
    paddingBottom: 10
  },
  left: {
    flex: 1,
    alignItems: 'flex-start'
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    display: 'flex',
    flex: 4,
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
