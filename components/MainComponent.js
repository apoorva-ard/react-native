import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, StatusBar } from 'react-native';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


//since i am using version 4 of react-navigation, createAppContainer is necessary 

const MenuNavigator = createAppContainer(createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
},
    { initialRouteName: 'Menu' }
));

const HomeNavigator = createAppContainer(createStackNavigator({
    Home: { screen: Home }
}));

const ContactNavigator = createAppContainer(createStackNavigator({
    Contact: { screen: Contact }
}));

const AboutNavigator = createAppContainer(createStackNavigator({
    About: { screen: About }
}));


const MainNavigator = createAppContainer(createDrawerNavigator({
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    About:
    {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us'
        },
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        },
    },
    Contact:
    {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us'
        },
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
}));

class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                <MainNavigator />
            </View>
        );
    }

}

export default Main;