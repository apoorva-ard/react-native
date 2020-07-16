import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, StatusBar, SafeAreaView, ScrollView, Image, Text, StyleSheet, ToastAndroid } from 'react-native';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

//since i am using version 4 of react-navigation, createAppContainer is necessary 

const MenuNavigator = createAppContainer(createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={24}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        })
    },
    Dishdetail: { screen: Dishdetail }
},
    { initialRouteName: 'Menu' }
));

const HomeNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={26}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        })
    }
}));

const LoginNavigator = createAppContainer(createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={26}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        })
    }
}));

const ContactNavigator = createAppContainer(createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={24}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        }) }
}));

const AboutNavigator = createAppContainer(createStackNavigator({
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={26}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        })
    }
}));

const ReservationNavigator = createAppContainer(createStackNavigator({
    Reservation: {
        screen: Reservation,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={26}
                    color="white"
                    onPress={() => navigation.toggleDrawer()}
                />
            )
        })
    }
}));

const FavoritesNavigator = createAppContainer(createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <Icon
                    name="menu"
                    size={24}
                    iconStyle={{ color: 'white' }}
                    onPress={() => navigation.navigate('DrawerToggle')}
                />
            )
        })
    }
}));

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top:'always', horizontal:'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={{ flex: 2 }} >
                    <Text style={styles.drawerHeaderText}>Restorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
    );

const MainNavigator = createAppContainer(createDrawerNavigator({
    Login:
    {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        }
    },
    About:
    {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        },
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            ),
        },
    },
    Contact:
    {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            ),
        },
    },
    Favorites:
    {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    },
    Reservation:
    {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    }
}, {
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
}));

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: ' + connectionInfo.type, ToastAndroid.LONG)
            });

        //NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    //due to the latest version ..

    unsubscribe = NetInfo.addEventListener(state => {
        ToastAndroid.show('Network Connectivity Type: ' + state.type, ToastAndroid.LONG)
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
    });

    componentWillUnmount() {
        unsubscribe();
        //NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
                <MainNavigator />
            </View>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})