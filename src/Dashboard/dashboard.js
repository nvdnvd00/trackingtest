//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AddTimer from './addTimer';
import { toggleTimer, addTotalTimer } from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/vi';
var currentDate = moment().locale("vi").format("dddd, Do MMMM ");


class HeaderTitle extends Component {
    render() {
        console.disableYellowBox = true;
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
            counter: 0,

        };
        this.countTimeId = 0;
        this.hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];


    }
    startCount() {

        this.countTimeId = setInterval(() =>
            this.updateCount(),
            1000)
            ;

    }

    updateCount() {
        this.setState({
            counter: this.state.counter += 1
        });
        this.props.onAddTotalTime();
    }
    stopCount() {
        clearInterval(this.countTimeId);
        this.setState({ counter: 0 })
    }


    static navigationOptions = {
        headerTitle: <HeaderTitle />,
    };
    render() {

        return (
            <View style={{ flex: 1 }}>

                <View style={{ width: undefined, height: 80, borderBottomWidth: 0.5 }}>
                    <ScrollView style={{ flex: 1 }} horizontal={true}>
                        <View style={{ width: undefined, height: 80, flexDirection: 'column' }}>
                            <View style={{ width: undefined, height: 20, flexDirection: 'row' }}>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key}>
                                            <Text style={{}}>{item}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ height: 7, width: 50, borderLeftWidth: 1, borderBottomWidth: 0.5 }} ></View>
                                                <View style={{ height: 7, width: 50, borderLeftWidth: 1, borderBottomWidth: 0.5 }} ></View>
                                                <View style={{ height: 7, width: 50, borderLeftWidth: 1, borderBottomWidth: 0.5 }} ></View>
                                                <View style={{ height: 7, width: 50, borderLeftWidth: 1, borderBottomWidth: 0.5 }} ></View>
                                            </View>
                                        </View>
                                    ))}
                            </View>
                            <View style={{ top: 4, height: 50, backgroundColor: 'yellowgreen' }}>

                            </View>
                        </View>


                    </ScrollView>
                </View>

                <ScrollView style={{ flex: 1, }}>
                    <FlatList
                        style={{ height: undefined }}
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
                                        borderRadius: 7,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ alignSelf: 'center' }}>
                                            {Math.floor(item.totalTime / 3600)}:{Math.floor((item.totalTime - Math.floor(item.totalTime / 3600) * 3600) / 60)}
                                        </Text>
                                    </View>
                                    <View>
                                        <View style={{
                                            height: 60,
                                            flex: 4,
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={
                                                {
                                                    fontSize: 16,
                                                    paddingLeft: 5,
                                                    //color: item.color
                                                }
                                            }>
                                                {item.timerName}
                                            </Text>

                                            {(item.timerDescription.trim()) ?


                                                <Text style={
                                                    {
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        paddingLeft: 5,
                                                        //color: item.color
                                                    }
                                                }>
                                                    {item.timerDescription}
                                                </Text> : null
                                            }
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <TouchableOpacity style={{ maxWidth: 150 }}
                                            onPress={() => {
                                                this.props.onClickToggle(item.timerId);
                                                this.stopCount();
                                                this.startCount();
                                            }}>

                                            {
                                                item.onDoing === false ? <Icon style={{
                                                    right: 10,
                                                    alignSelf: 'flex-end'
                                                }} name="ios-time" size={50} color='grey' />
                                                    : <View style={{ flexDirection: 'row' }}>
                                                        <View style={{
                                                            justifyContent: 'center'
                                                        }}>
                                                            <View style={{
                                                                backgroundColor: item.color,
                                                                height: 30,
                                                                width: 55,
                                                                borderTopLeftRadius: 7,
                                                                borderBottomLeftRadius: 7,
                                                                justifyContent: 'center'
                                                            }}>
                                                                <Text style={{ alignSelf: 'center', right: 3 }}>
                                                                    {Math.floor(this.state.counter / 60)}:{this.state.counter - Math.floor(this.state.counter / 60) * 60}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <Icon style={{
                                                            right: 10,
                                                            alignSelf: 'flex-end'
                                                        }} name="ios-time" size={50} color={item.color} />

                                                    </View>
                                            }

                                        </TouchableOpacity>
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
function mapDispatchToProps(dispatch) {
    return {
        onClickToggle: (timerId) => {
            dispatch(toggleTimer(timerId));

        },
        onAddTotalTime: () => {
            dispatch(addTotalTimer());
        }
    }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
