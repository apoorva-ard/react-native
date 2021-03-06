import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({ item, index }) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favourite?',
                            'Are you sure you want to remove ' + item.name + ' from favourites?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => { console.log(item.name + 'not deleted from favs') },
                                    style: 'cancel'
                                },
                                {
                                    text: 'Ok',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ]
                        );
                    }

                        
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <FlatList 
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                </Animatable.View>
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);