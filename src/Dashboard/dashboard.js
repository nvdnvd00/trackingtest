//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AddTimer from './addTimer';
import { toggleTimer, addTotalTimer, addNewTimerShow, updateTimerShow } from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/vi';
var currentDate = moment().locale("en").format("dddd, MMMM DD ");


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
            now: new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds(),
            timerArr: []
        };
        this.countTimeId = 0;
        this.countTime2 = 0;
        this.hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

    }


    componentDidMount() {
        this.countTime2 = setInterval(() => {
            this.setState({ now: this.state.now + 1 });
        }
            ,
            1000
        )
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
        // this.props.onUpdateTimerShow();
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

            <View style={{ flex: 1,backgroundColor:'#FFFFFF' }}>
                {/* // {alert(this.state.now)} */}
                <View style={{ width: undefined, height: 85, borderBottomWidth: 1,borderColor:'#EFEDF0' }}>
                    <ScrollView style={{ flex: 1 }} horizontal={true}>
                        <View style={{ width: undefined, height: 80, flexDirection: 'column' }}>
                            <View style={{ width: undefined, height: 20, flexDirection: 'row' }}>
                                <View style={{width:90,backgroundColor:'transparent'}}></View>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key} style={{width:180}}>
                                            <Text style={{fontSize:12,paddingTop:5,alignSelf:'center'}}>{item}</Text>
                                            
                                        </View>
                                    ))}
                                    <View style={{width:90,backgroundColor:'transparent'}}></View>
                            </View>
                            <View style={{ width: undefined, flexDirection: 'row' }}>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key} style={{ flexDirection: 'row' }}>
                                           
                                          
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 1 }} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8'}} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8' }} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8'}} ></View>
                                          
                                        </View>
                                    ))}
                                    <View style={{ height: 7, width: 45, borderLeftWidth: 1 }} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8'}} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8' }} ></View>
                                                <View style={{ height: 7, width: 45, borderLeftWidth: 0.5,borderColor:'#B7B5B8'}} ></View>
                            </View>
                           

                            <View style={{height: 50, backgroundColor: '#EEEAED' }}>
                                <FlatList
                                    style={{ height: undefined }}
                                    data={this.props.timerShow}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{
                                                height: 50,
                                                position: 'absolute',
                                                backgroundColor: 'blue',
                                                left: item.timerShowLeft,
                                                width: (this.state.now * 4320 / 86400) - item.timerShowLeft,
                                                backgroundColor: item.timerShowColor,
                                            }}>
                                                <Text style={{height:25,paddingLeft:10}}>{item.timerShowName}</Text>

                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.timerShowId}
                                >
                                </FlatList>

                                
                            </View>
                            <View style={{
                                    height: 85,
                                    position: 'absolute',
                                    borderLeftWidth: 1,
                                    borderColor: 'black',
                                    left: this.state.now * 4320 / 86400
                                }}>
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
                                    borderWidth: 0.5,
                                    borderColor: '#E5E5E5'
                                }}>
                                    <View style={{

                                        margin: 10,
                                        height: 50,
                                        width: 50,
                                        backgroundColor: item.color,
                                        borderRadius: 7,
                                        justifyContent: 'center'
                                    }}>
                                    {Math.floor((item.totalTime - Math.floor(item.totalTime / 3600) * 3600) / 60)>9?
                                        <Text style={{ alignSelf: 'center',color:'#FFFFFF' ,fontSize:14}}>
                                        
                                            {Math.floor(item.totalTime / 3600)}:{Math.floor((item.totalTime - Math.floor(item.totalTime / 3600) * 3600) / 60)}
                                            
                                        </Text>
                                        :
                                        <Text style={{ alignSelf: 'center',color:'#FFFFFF' ,fontSize:14}}>
                                        
                                            {Math.floor(item.totalTime / 3600)}:0{Math.floor((item.totalTime - Math.floor(item.totalTime / 3600) * 3600) / 60)}
                                            
                                        </Text>}

                                    </View>
                                    <View>
                                        <View style={{
                                            height: 60,
                                            flex: 4,
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={
                                                {
                                                    fontSize: 14,
                                                    paddingLeft: 5,
                                                    paddingTop:5,
                                                    color: '#929193'
                                                }
                                            }>
                                                {item.timerName}
                                            </Text>

                                            {(item.timerDescription.trim()) ?


                                                <Text style={
                                                    {
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        paddingLeft: 5,
                                                        paddingTop:5,
                                                        color: '#414141'
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
                                                if (item.onDoing === false) {
                                                    this.props.onAddNewTimerShow(this.state.now * 4320 / 86400, 0,item.color,item.timerName);
                                                   // console.log(this.props.timerShow);
                                                }
                                                else {
                                                    this.props.onAddNewTimerShow(this.state.now * 4320 / 86400, 0,'#EEEAED','');
                                                }

                                            }
                                            }>

                                            {
                                                item.onDoing === false ? <Icon style={{
                                                    right: 10,
                                                    alignSelf: 'flex-end'
                                                }} name="ios-time" size={50} color='#B7B6B8' />
                                                    :
                                                    <View style={{ flexDirection: 'row' }}>
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
                                                                <Text style={{ alignSelf: 'center', right: 3,color:'#FFFFFF' }}>
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
    componentWillUnMount() {
        clearInterval(this.countTime2);
    }
}

// define your styles
const styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return {
        timer: state.timerReducers,
        timerShow: state.timerShowReducers
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClickToggle: (timerId) => {
            dispatch(toggleTimer(timerId));

        },
        onAddTotalTime: () => {
            dispatch(addTotalTimer());
        },
        onAddNewTimerShow: (inputTimerShowLeft, inputTimerShowWidth,inputColor,inputShowName) => {
            dispatch(addNewTimerShow(inputTimerShowLeft, inputTimerShowWidth,inputColor,inputShowName));
        },
        onUpdateTimerShow: () => {
            dispatch(updateTimerShow());
        },
    }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
