import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Modal } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.icons}>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? "heart" : "heart-o"}
                    type="font-awesome"
                    color="#f50"
                    onPress={() => { props.favorite ? console.log("Already favourite") : props.onPress() }}
                    />
                <Icon
                    raised
                    reverse
                    name="pencil"
                    type="font-awesome"
                    color="#512DA8"
                    onPress={() => {props.onPressComment()}}
                />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                    style={{ paddingVertical: 10, flex: 1, flexDirection: 'row' }}
                    imageSize={20}
                    readonly
                    startingValue={item.rating}/>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
            );
    };
    return (
        <Card title="Comments">
            <FlatList data={props.comments} renderItem={renderCommentItem} keyExtractor={item=> item.id.toString()} />
        </Card>
    );
}


class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onPressComment={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal style={styles.modal}
                    animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <Rating
                        showRating
                        type='custom'
                        style={{ paddingVertical: 10 }}
                        onFinishRating={(rating) => this.setState({rating : rating})}
                    />
                    <View style={styles.modalText}>
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(text) => this.setState({ author: text })}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(text) => this.setState({ comment: text })}
                        />
                        <Button
                            buttonStyle={styles.button1}
                            onPress={() => this.handleComment(dishId)}
                            title="SUBMIT"
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            buttonStyle={styles.button2}
                            onPress={() => { this.toggleModal(); }}
                            title="CANCEL"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    buttons: {
        marginTop:20,
        margin: 10
    },
    button1: {
        backgroundColor: "#512DA8"
    },
    button2: {
        backgroundColor: "#808080"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);