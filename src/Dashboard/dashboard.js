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
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    onRefresh() {
        this.setState({ refreshing: true }, function () { });
    }

    static navigationOptions = {
        headerTitle: <HeaderTitle />,
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 100, backgroundColor: 'grey' }} >

                </View>
                <ScrollView style={{ flex: 1, }}>
                    <FlatList
                        style={{ height: undefined }}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.refreshing}
                        data={this.props.timer}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: 'grey',
                                }}>
                                    <View style={{
                                        margin: 10,
                                        height: 60,
                                        width: 60,
                                        backgroundColor: item.color,
                                        borderRadius: 7
                                    }}>
                                    //count total time here
                                    </View>
                                    <View>
                                        <View style={{
                                            height: 60,

                                            justifyContent: 'center',
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
                                    </View>
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
