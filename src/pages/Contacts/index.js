import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import Contacts from 'react-native-unified-contacts';
import ContactItem from '../../components/ContactItem';

import styles from './styles';

const { modal, header, left, title, cancel } = styles;

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
            const contactList = JSON.parse(await AsyncStorage.getItem('contacts')) || [];
            const filter = contactList.map(contact => contact.identifier);
            this.setState({
              contactList: [...contacts.filter(c => filter.indexOf(c.identifier) < 0)]
            });
          }
          this.setState({ loading: false });
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
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { contactList, loading = true } = this.state;
    const { onSelect, onClose } = this.props;
    return (
      <ScrollView style={modal}>
        <View style={header}>
          <View style={left} />
          <Text style={title}>New Contact Shortcut</Text>
          <TouchableOpacity onPress={onClose} style={cancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        {loading &&
          <ActivityIndicator size="large" />
        }
        {contactList.length < 1 && !loading ?
          <View>
            <Text>There is no contact in your phone.</Text>
          </View>
          :
          <FlatList
            data={contactList}
            renderItem={({ item: contact }) => <ContactItem key={contact.identifier} contact={contact} onPress={onSelect} />}
          />
        }
      </ScrollView>
    );
  }
}

export default ContactsPage;
