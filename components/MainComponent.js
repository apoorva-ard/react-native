import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, StatusBar } from 'react-native';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const MenuNavigator1 = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
},
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);
const MenuNavigator = createAppContainer(MenuNavigator1);

class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                <MenuNavigator />
            </View>
        );
    }

}

export default Main;