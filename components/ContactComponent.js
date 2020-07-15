import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {

        return (
            <Animatable.View animation = "fadeInDown" duration = { 2000} delay = { 1000} > 
                <View>
                    <Card title="Contact Information" titleStyle={{ fontWeight: 'bold', fontSize: 20 }}>
                        <Text style={styles.eachLine}>121, Clear Water Bay Road</Text>
                        <Text style={styles.eachLine}>Clear Water Bay, Kowloon</Text>
                        <Text style={styles.eachLine}>HONG KONG</Text>
                        <Text style={styles.eachLine}>Tel: +852 1234 5678</Text>
                        <Text style={styles.eachLine}>Fax: +852 8765 4321</Text>
                        <Text style={styles.eachLine}>Email:confusion@food.net</Text>
                    </Card>
                </View>
            </Animatable.View>
            );
    }
}

export default Contact;

const styles = StyleSheet.create({
    eachLine: { lineHeight: 30}
});