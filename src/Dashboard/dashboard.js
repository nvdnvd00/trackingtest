//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AddTimer from './addTimer';
import moment from 'moment';
import 'moment/locale/vi';
var currentDate = moment().locale("vi").format("dddd, Do MMMM ");


class HeaderTitle extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/calendar.png')}
                        style={{ width: 25, height: 25 }}
                    />
                </View>
                <View style={{ flex: 6, alignItems: 'center' }}>
                    <Text>{currentDate}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
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
                <ScrollView style={{ flex: 1, }}>
                    <FlatList
                        style={{ height: undefined }}
                        data={this.props.timer}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    height: 60,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'grey',
                                    justifyContent:'center',
                                }}>
                                    <Text style={
                                        {
                                            fontSize: 16,
                                            paddingLeft: 5,
                                            color: this.props.color
                                        }
                                    }>
                                        {item.timerName}
                                    </Text>

                                    <Text style={
                                        {
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            paddingLeft: 5,
                                            color: this.props.color
                                        }
                                    }>
                                        {item.timerDescription}
                                    </Text>

                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.timerId}
                    >
                    </FlatList>
                    <AddTimer onPress={() => { this.props.navigation.navigate('AddComponentScreen') }} />
                </ScrollView>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({

});
function mapStateToProps(state) {
    return {
        timer: state.timerReducers
    };
}
//make this component available to the app
export default connect(mapStateToProps)(Dashboard);
