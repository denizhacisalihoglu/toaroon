import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import styles from './styles';

import {
  CloseButton,
  Item
} from '../../components';

const { modal, header, left, right, page, title, warning, item } = styles;

const options = {
  title: 'Select a Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class AddPhoto extends Component {
  showImagePicker = () => () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
        });
      }
    });
  };
  render() {
    return (
      <View style={modal}>
        <View style={header}>
          <Text style={left} />
          <Text style={title}>About Toaroon</Text>
          <View style={right}>
            <CloseButton
              onPress={() => {
                this.props.photoModal(false);
              }}
            />
          </View>
        </View>
        <View style={page}>
          <Item style={item} onPress={this.showImagePicker()} />
          <Text style={title}>Upload Your Photo</Text>
          <Text style={warning}>Please do not use a photo that
he/she wears sunglasses, hats or etc.</Text>
        </View>
      </View>
    );
  }
}

export default AddPhoto;
