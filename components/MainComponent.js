import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, StatusBar } from 'react-native';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const MenuNavigator1 = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
},
    { initialRouteName: 'Menu' }
);

const HomeNavigator1 = createStackNavigator({
    Home: { screen: Home }
});

const MenuNavigator = createAppContainer(MenuNavigator1);
const HomeNavigator = createAppContainer(HomeNavigator1);

const MainNavigator1 = createDrawerNavigator({
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        },
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
});

const MainNavigator = createAppContainer(MainNavigator1);

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