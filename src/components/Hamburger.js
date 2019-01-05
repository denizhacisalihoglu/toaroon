import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';


const Hamburger = (props) => {
    const { navigation } = props;
    const icon = require('../assets/icons/ic_menu_black.png');
    
    const fn = () => {
        navigation.openDrawer();
    };

    const slop = { top: 5, left: 5, bottom: 5, right: 5 };
    const styles = {
      hamburger: {
        flex: 1,
        paddingLeft: 10
      }
    };
    
    return (
      <TouchableOpacity onPress={fn} style={styles.hamburger} hitSlop={slop}>
        <Image source={icon} />
      </TouchableOpacity>
    );
};
export default withNavigation(Hamburger);
