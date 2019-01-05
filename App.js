/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from './src/pages/Home';
import About from './src/pages/About';

const App = createStackNavigator({
    Home: {
        screen: Home
    },
    About: {
        screen: About
    }
},
    {
        headerMode: 'none'
    });

const Drawer = createDrawerNavigator({
    HomePage: {
        screen: App,
        navigationOptions: () => ({ title: 'Home' })
    },
    AboutPage: {
        screen: About,
        navigationOptions: () => ({ title: 'About Toaroon' }),
    }
});

export default createAppContainer(Drawer);
