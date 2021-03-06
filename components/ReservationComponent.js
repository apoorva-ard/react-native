import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
//import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            //showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    };

    toggleModal() {
       // this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        const smoke = this.state.smoking ? 'Yes' : 'No';
        Alert.alert(
            'Your Reservation',
            'Number of Guests: ' + this.state.guests + '\nSmoking: ' + smoke + '\nDate and Time: ' + this.state.date,
            [
                { text: 'Cancel', onPress: () => { console.log('Cancel Pressed'); this.resetForm() }, style: 'cancel' },
                { text: 'OK', onPress: () => { this.resetForm(); this.obtainCalendarPermission(); }},
            ],
            { cancelable: false }
        );
        this.presentLocalNotification(this.state.date);
       // this.toggleModal();
    }

    obtainCalendarPermission = async () => {
        const calenderPermission = await Calendar.requestCalendarPermissionsAsync();
        if (calenderPermission.status === 'granted') {
            const details = {
                title: 'Con Fusion Table Reservation',
                startDate: this.state.date,
                endDate: (Date.parse(this.state.date) + (2 * 60 * 60 * 1000)),
                timeZone: 'Asia/Kolkata',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong' 
            }
            this.addReservationToCalendar(details);
        }
    } 

    addReservationToCalendar = async (details) => {

        const calendars = await Calendar.getCalendarsAsync();
        console.log(calendars);
        const defaultCalendars = calendars.filter(each => each.source.type === 'LOCAL' || each.source.name === 'Default');
        const cid = defaultCalendars[0].id;

        const eventId = await Calendar.createEventAsync(cid, details);
        ToastAndroid.show('Event added to your calendar!', ToastAndroid.LONG)
        console.log('Event id : ' + eventId);
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000} useNativeDriver={true}>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;

/*
<DateTimePicker
    testID="dateTimePicker"
    value={new Date()}
    mode="time"
    is24Hour={true}
    display="default"
    onChange={(event, date) => this.state.date = selectedDate || date}
    />
    
<Modal animationType={"slide"} transparent={false}
    visible={this.state.showModal}
    onDismiss={() => this.toggleModal()}
    onRequestClose={() => this.toggleModal()}>
    <View style={styles.modal}>
        <Text style={styles.modalTitle}>Your Reservation</Text>
        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>Date and Time: {(this.state.date)[1]}</Text>
        <Button
            onPress={() => { this.toggleModal(); this.resetForm(); }}
            color="#512DA8"
            title="Close"
        />
    </View>
</Modal>

    */