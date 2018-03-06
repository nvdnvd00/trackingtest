//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';
var currentDate = moment().locale("vi").format("dddd, Do MMMM ");


class HeaderTitle extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1,alignItems:'center' }}>
                    <Image
                        source={require('../../assets/calendar.png')}
                        style={{ width: 25, height: 25 }}
                    />
                </View>
                <View style={{ flex: 6 , alignItems:'center'}}>
                    <Text>{currentDate}</Text>
                </View>
                <View style={{ flex: 1 ,alignItems:'center'}}>
                <Image
                        source={require('../../assets/settings.png')}
                        style={{ width: 25, height: 25 }}
                    />
                </View>
            </View>
        );
    }
}


// create a component
class Dashboard extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle />,
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 100, backgroundColor: 'red' }} >

                </View>
                <View style={{ flex: 1, backgroundColor: 'green' }}></View>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default Dashboard;
