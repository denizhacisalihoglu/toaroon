import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Contacts from 'react-native-unified-contacts';
import ContactItem from '../components/ContactItem';

class ContactsPage extends Component {
  state = {
    contactList: []
  }
  componentDidMount() {
    Contacts.requestAccessToContacts((userCanAccessContacts) => {
      if (userCanAccessContacts) {
        Contacts.getContacts(async (error, contacts) => {
          if (error) {
            console.error(error);
          } else {
            console.log(contacts);
            const contactList = JSON.parse(await AsyncStorage.getItem('contacts')) || [];
            console.log(contactList);
            const filter = contactList.map(contact => contact.identifier);
            this.setState({
              contactList: [...contacts.filter(c => filter.indexOf(c.identifier) < 0)]
            });
          }
        });
      } else {
        Alert.alert(
          'Can\'t Access Your Contacts' +
          'Click on Open Settings and allow Toaroon to access your Contacts.\n' +
          '\n' +
          'Then come back!',
          [
            { text: 'Open Settings', onPress: () => Contacts.openPrivacySettings() },
            { text: 'Later' }
          ]);
      }
    });
  }
  render() {
    const { contactList } = this.state;
    const { onSelect, onClose } = this.props;
    return (
      <ScrollView style={styles.modal}>
        <View>
          <Text style={styles.title}>New Contact Shortcut</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        {contactList.length < 1 ?
          <View>
            <Text>empty</Text>
          </View>
          :
          contactList.map(contact => (
            <ContactItem key={contact.identifier} contact={contact} onPress={onSelect} />
          ))
        }
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

export default ContactsPage;
