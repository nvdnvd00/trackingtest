//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import AddTimer from './addTimer';
import {toggleTimer} from '../../redux/actions';
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
                                        borderRadius: 7,
                                        justifyContent:'center'
                                    }}>
                                        <Text style={{alignSelf:'center'}}>00:00</Text>
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
                                    <View style={{ flex: 1, justifyContent: 'center',alignItems:'flex-end' }}>
                                        <TouchableOpacity style={{maxWidth:150}} 
                                        onPress={()=>{this.props.onClickToggle(item.timerId)}}>

                                            {item.onDoing===false? <Icon style={{ 
                                                right: 5, 
                                                alignSelf: 'flex-end' 
                                            }} name="access-time" size={50} color='grey' />
                                            :<Icon style={{ 
                                                right: 5, 
                                                alignSelf: 'flex-end' 
                                                }} name="access-time" size={50} color={item.color} />}
                                            
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
        onClickToggle: (timerId) =>{
            dispatch(toggleTimer(timerId));
        }
    }
}
//make this component available to the app
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
