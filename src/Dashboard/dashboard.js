//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, TextInput, Alert,Platform } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AddTimer from './addTimer';
import { toggleTimer, addTotalTimer, addNewTimerShow, updateTimerShow, addNewTimer } from '../../redux/actions';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'moment/locale/vi';
var currentDate = moment().locale("en").format("dddd, MMMM DD ");

// create a component
class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {}
        return {
            headerTitle: 
            
                (<View style={{justifyContent:'center',flex:1}}>
                    <Text style={{alignSelf:'center'}}>
                        {currentDate}
                    </Text>
                    <Text style={{ alignSelf: 'center' }}>
                        {Math.floor((params.allTime - Math.floor(params.allTime / 3600) * 3600) / 60) > 9 ?
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>

                                {Math.floor(params.allTime / 3600)}:{Math.floor((params.allTime - Math.floor(params.allTime / 3600) * 3600) / 60)}

                            </Text>
                            :
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>

                                {Math.floor(params.allTime / 3600)}:0{Math.floor((params.allTime - Math.floor(params.allTime / 3600) * 3600) / 60)}

                            </Text>} hrs total
                           
                </Text>
                        </View>),
            headerLeft: (<Image
                source={require('../../assets/calendar.png')}
                style={{ width: 25, height: 25, marginLeft: 15}}
            />),
            headerRight: (<Image
                source={require('../../assets/settings.png')}
                style={{ width: 25, height: 25, marginRight: 15}}
            />)
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            now: new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds(),
            allTime: 0,
            currentColor: '#EEEAED',
            newTimerName: '',
            colorChoose: '',
            newTimerDescription: '',
            dataColor: ['#7785B3','#83C382', '#82CBBC', '#C77C57', '#C16672']


        };
        this.toggleRunning=false; //dong ho co dang chay khong, set lai neu can
        this.onOpenAdd = false;
        this.countTimeId = 0;
        this.countTime2 = 0;
        this.props.navigation.setParams({ allTime: this.state.allTime })
        this.hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

    }


    componentWillMount() {
        this.countTime2 = setInterval(() => {
            this.setState({ now: new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds() }); //set state now
            this.props.onUpdateTimerShow(((new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()) * 4320 / 86400)); //get location of proj in timebar to update new location every seconds
        }
            ,
            1000
        )
    }

    startCount() {
//start counter, call updateCount everyseconds
        this.countTimeId = setInterval(() =>
            this.updateCount(),
            1000)
            ;
    }
    updateCount() {
        this.setState({
            counter: this.state.counter + 1, //increase counter 
        });
        //set current color to show in timebar
        {
            (this.props.timerShow.length > 0) ?
                this.setState({ currentColor: this.props.timerShow[this.props.timerShow.length - 1].timerShowColor }) : null
        }
        //set alltime to show in header
        {
            (this.state.currentColor === '#EEEAED') ? null :
                this.setState({
                    allTime: this.state.allTime + 1,
                });

        }
        { this.props.navigation.setParams({ allTime: this.state.allTime }) }
        this.props.onAddTotalTime();


    }
    //stop count, reset counter 
    stopCount() {
        clearInterval(this.countTimeId);
        this.setState({ counter: 0 })
    }
    //convert seconds -> H:MM
    convertToHHMM(time,colorr){
        if (Math.floor((time - Math.floor(time / 3600) * 3600) / 60) > 9) 
        return (
        <Text style={{ alignSelf: 'center', color: colorr, fontSize: 14 }}>

                {Math.floor(time/ 3600)}:{Math.floor((time- Math.floor(time / 3600) * 3600) / 60)}

            </Text>)
            else return (
            <Text style={{ alignSelf: 'center', color: colorr, fontSize: 14 }}>

                {Math.floor(time / 3600)}:0{Math.floor((time - Math.floor(time/ 3600) * 3600) / 60)}
                </Text>)
    } 

    render() {
        console.disableYellowBox = true;

        return (

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                {this.toggleRunning===false? //toggle show timebar min/max
                <View style={{ width: undefined, height: 85, borderBottomWidth: 1, borderColor: '#EFEDF0' }}>
                
                    <ScrollView style={{ flex: 1 }} //timebar scollview
                        horizontal={true}>
                        <View style={{ width: undefined, height: 80, flexDirection: 'column' }}>
                        {/* hours label in timebar */}
                            <View style={{ width: undefined, height: 20, flexDirection: 'row' }}>
                            
                                <View style={{ width: 90/3, backgroundColor: 'transparent' }}></View>
                                
                                {this.hours.map((item, key) => 
                                    (
                                        <View key={key} style={{ width: 180/3 }}>
                                            <Text style={{ fontSize: 12, paddingTop: 5, alignSelf: 'center' }}>{item}</Text>

                                        </View>
                                    ))}
                                <View style={{ width: 90/3, backgroundColor: 'transparent' }}></View>
                            </View>
                            {/* separate in timbar */}
                            <View style={{ width: undefined, flexDirection: 'row' }}>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key} style={{ flexDirection: 'row' }}>


                                            <View style={{ height: 7, width: 45/3, borderLeftWidth: 1 }} ></View>
                                            <View style={styles.separateHoursMin} ></View>
                                            <View style={styles.separateHoursMin} ></View>
                                            <View style={styles.separateHoursMin} ></View>

                                        </View>
                                    ))}
                                <View style={{ height: 7, width: 45/3, borderLeftWidth: 1 }} ></View>
                                <View style={styles.separateHoursMin} ></View>
                                <View style={styles.separateHoursMin} ></View>
                                <View style={styles.separateHoursMin} ></View>
                            </View>
                            {/* space in timebar mini */}
                            <View style={{ marginTop:10}}></View> 
                                {/*show proj in timebarmini*/}
                            <View style={{ height: 35, backgroundColor: '#EEEAED' }}>
                                <FlatList
                                    style={{ height: undefined }}
                                    data={this.props.timerShow}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{
                                                height: 50/2+10,
                                                position: 'absolute',
                                                
                                                left: item.timerShowLeft/3,
                                                width: item.timerShowWidth/3,
                                                backgroundColor: item.timerShowColor,
                                            }}>
                                            </View>

                                        );
                                    }}
                                    keyExtractor={(item) => item.timerShowId}
                                >
                                </FlatList>
                            </View>
                            {/* now */}
                            <View style={{
                                height: 85,
                                position: 'absolute',
                                borderLeftWidth: 1,
                                borderColor: 'black',
                                left: this.state.now * 4320 / 86400/3
                            }}>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :
                
                // max timebar
                <View style={{ width: undefined, height: 85, borderBottomWidth: 1, borderColor: '#EFEDF0' }}>
                    <ScrollView style={{ flex: 1 }}
                        horizontal={true}
                     
                        contentOffset={{ x: (this.state.now * 4320 / 86400 - 300), y: 0 }} //lock scrollview to now
                    >
                        <View style={{ width: undefined, height: 80, flexDirection: 'column' }}>
                            <View style={{ width: undefined, height: 20, flexDirection: 'row' }}>
                                <View style={{ width: 90, backgroundColor: 'transparent' }}></View>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key} style={{ width: 180 }}>
                                            <Text style={{ fontSize: 12, paddingTop: 5, alignSelf: 'center' }}>{item}</Text>

                                        </View>
                                    ))}
                                <View style={{ width: 90, backgroundColor: 'transparent' }}></View>
                            </View>
                            <View style={{ width: undefined, flexDirection: 'row' }}>
                                {this.hours.map((item, key) =>
                                    (
                                        <View key={key} style={{ flexDirection: 'row' }}>


                                            <View style={{ height: 7, width: 45, borderLeftWidth: 1 }} ></View>
                                            <View style={styles.separateHoursMax} ></View>
                                            <View style={styles.separateHoursMax} ></View>
                                            <View style={styles.separateHoursMax} ></View>

                                        </View>
                                    ))}
                                <View style={{ height: 7, width: 45, borderLeftWidth: 1 }} ></View>
                                <View style={styles.separateHoursMax} ></View>
                                <View style={styles.separateHoursMax} ></View>
                                <View style={styles.separateHoursMax} ></View>
                            </View>


                            <View style={{ height: 50, backgroundColor: '#EEEAED' }}>
                                <FlatList
                                    style={{ height: undefined }}
                                    data={this.props.timerShow}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{
                                                height: 50,
                                                position: 'absolute',
                                                
                                                left: item.timerShowLeft,
                                                width: item.timerShowWidth,
                                                backgroundColor: item.timerShowColor,
                                            }}>
                                          
                                                <Text style={{ paddingLeft:5, paddingRight:5,top: 5, height: 25, alignSelf: 'center', fontSize: 12, color: '#FFFFFF' }}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                                >
                                                {item.timerShowName} {item.timerShowDes}
                                                </Text>
                                       
                                  
                                                {
                                                    (item.timerShowName === '') ? null :

                                                        Math.floor((item.totalTimerShow - Math.floor(item.totalTimerShow / 3600) * 3600) / 60) > 9 ?
                                                            (<Text style={{ height: 25, alignSelf: 'center', fontSize: 12, color: '#FFFFFF' }}>

                                                                {Math.floor(item.totalTimerShow / 3600)}:{Math.floor((item.totalTimerShow - Math.floor(item.totalTimerShow / 3600) * 3600) / 60)}

                                                            </Text>)
                                                            :
                                                            (<Text style={{ height: 25, alignSelf: 'center', fontSize: 12, color: '#FFFFFF' }}>

                                                                {Math.floor(item.totalTimerShow / 3600)}:0{Math.floor((item.totalTimerShow - Math.floor(item.totalTimerShow / 3600) * 3600) / 60)}

                                                            </Text>)
                                                }
   </View>


                                      

                                        );
                                    }}
                                    keyExtractor={(item) => item.timerShowId}
                                >
                                </FlatList>
                                <View style={{ position:'absolute',opacity:1,height: 50, backgroundColor: '#EEEAED',left: this.state.now*4320/86400,width: 4320-this.state.now*4320/86400}}></View>

                                <View style={{ position:'absolute',opacity:0.3,height: 50, backgroundColor: this.state.currentColor,left: this.state.now*4320/86400,width: 4320-this.state.now*4320/86400}}></View>


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
                }
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
                                        {this.convertToHHMM(item.totalTime,'#FFFFFF')}
                                    </View>
                                    <View style={{}}>
                                        <View style={{
                                            height: 60,
                                            flex: 4,
                                            justifyContent: 'center',
                                            
                                        }}>
                                            <Text style={
                                                {
                                                    fontSize: 14,
                                                    paddingLeft: 5,
                                                    paddingTop: 5,
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
                                                        paddingTop: 5,
                                                        color: '#414141',
                                                    }   
                                                }
                                                ellipsizeMode='tail'
                                                >
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
                                                    this.props.onAddNewTimerShow(this.state.now * 4320 / 86400, 0, item.color, item.timerName,' - '+item.timerDescription);
                                                    this.toggleRunning=true;
                                                    
                                                }
                                                else {
                                                    this.props.onAddNewTimerShow(this.state.now * 4320 / 86400, 0, '#EEEAED', '','');
                                                    this.toggleRunning=false;
                                                }


                                            }
                                            }>

                                            {
                                                item.onDoing === false ? <Icon style={{
                                                    paddingRight:10,
                                                    alignSelf: 'flex-end',
                                                   
                                                }} name="ios-time" size={50} color='#B7B6B8' />
                                                    :
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{
                                                            justifyContent: 'center'
                                                        }}>
                                                            <View style={{
                                                                backgroundColor: item.color,
                                                                height: 30,
                                                                width: 65,
                                                                borderTopLeftRadius: 5,
                                                                borderBottomLeftRadius: 5,
                                                                justifyContent: 'center'
                                                            }}>
                                                                {(this.state.counter - Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60) * 60) <= 9 ?
                                                                    (Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)) <= 9 ?
                                                                        <Text style={{ alignSelf: 'center', right: 2, color: '#FFFFFF', fontSize: 13 }}>
                                                                            {Math.floor(this.state.counter / 3600)}:0{Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)}:0{this.state.counter - Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60) * 60}
                                                                        </Text> :
                                                                        <Text style={{ alignSelf: 'center', right: 2, color: '#FFFFFF', fontSize: 13 }}>
                                                                            {Math.floor(this.state.counter / 3600)}:{Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)}:0{this.state.counter - Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60) * 60}
                                                                        </Text> :
                                                                    (Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)) <= 9 ?
                                                                        <Text style={{ alignSelf: 'center', right: 2, color: '#FFFFFF', fontSize: 13 }}>
                                                                            {Math.floor(this.state.counter / 3600)}:0{Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)}:{this.state.counter - Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60) * 60}
                                                                        </Text> :
                                                                        <Text style={{ alignSelf: 'center', right: 2, color: '#FFFFFF', fontSize: 13 }}>
                                                                            {Math.floor(this.state.counter / 3600)}:{Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60)}:{this.state.counter - Math.floor((this.state.counter - Math.floor(this.state.counter / 3600) * 3600) / 60) * 60}
                                                                        </Text>
                                                                }
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
                    <AddTimer onPress={() => { this.onOpenAdd = !this.onOpenAdd; }} />
                </ScrollView>
                {(this.onOpenAdd === true) ?

                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        //height: 64
                    }}>
                        <View>

                            <TextInput style={styles.textInput}
                          
                                placeholderTextColor='grey'
                                placeholder='Enter Timer Name'
                                autoCapitalize='none'
                                onChangeText={
                                    (text) => {
                                        this.setState({ newTimerName: text })
                                    }
                                }
                            />
                        </View>
                        <View>
                            <TextInput style={styles.textInput}

                                placeholderTextColor='grey'
                                placeholder='Enter Description'
                                autoCapitalize='none'
                                onChangeText={
                                    (text) => {
                                        this.setState({ newTimerDescription: text })
                                    }
                                }
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                flex: 1, alignItems: 'center', 
                                height: 30,
                                margin: 5,
                                marginRight: 0,
                                padding: 5,
                                borderColor: 'grey',
                                borderWidth: 1,
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30
                            }}>
                                <Text style={{fontSine:13}}>Choose Color</Text>
                            </View>
                            <ModalDropdown
                                style={styles.modalDrop}
                                options={this.state.dataColor}
                                dropdownStyle={{ height: undefined, width: 100 }}
                                dropdownTextStyle={{ fontSize: 14 }}

                                onSelect={(idx, value) => {
                                    this.setState({ colorChoose: value });

                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                margin: 10,
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: '#E04F49'

                            }}
                                onPress={() => {
                                    this.onOpenAdd = !this.onOpenAdd;
                                }}
                            >

                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                alignItems: 'center',
                                margin: 10,
                                
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor:'#52A8FB'

                            }}
                                onPress={() => {
                                    if (!this.state.newTimerName.trim()) {
                                        Alert.alert('Error', 'Please enter Timer name!');
                                        return;
                                    } else
                                        if (!this.state.colorChoose.trim()) {
                                            Alert.alert('Error', 'Please choose Timer color!');
                                            return;
                                        } else {

                                            this.props.onClickAdd(this.state.newTimerName, this.state.newTimerDescription, this.state.colorChoose);
                                            {
                                                this.setState({
                                                    newTimerName: '',
                                                    newTimerDescription: '',
                                                    colorChoose: '',
                                                })
                                            }
                                            this.onOpenAdd = false;
                                        }
                        
                                }}


                            >

                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>Done</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    :
                    null}

            </View>
        );
    }

    componentWillUnMount() {
        clearInterval(this.countTime2);
    }
}

// define your styles
const styles = StyleSheet.create({
    modalDrop: {
        height: 30,
        flex: 1,
        alignItems: 'center',
        margin: 5,
        marginLeft: 0,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    textInput: {
        fontSize: 10,
        height: 30,
        width: 300,
        margin: 5,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        color: 'black',
        borderRadius: 30
    },
    separateHoursMin: {
        height: 7, width: 45/3, borderLeftWidth: 0.5, borderColor: '#B7B5B8',
    },
    separateHoursMax: {
        height: 7, width: 45, borderLeftWidth: 0.5, borderColor: '#B7B5B8',
    }
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
        onAddNewTimerShow: (inputTimerShowLeft, inputTimerShowWidth, inputColor, inputShowName,inputShowDes) => {
            dispatch(addNewTimerShow(inputTimerShowLeft, inputTimerShowWidth, inputColor, inputShowName,inputShowDes));
        },
        onUpdateTimerShow: (input) => {
            dispatch(updateTimerShow(input));
        },
        onClickAdd: (inputTimerName, inputTimerDescription, timerColor) => {
            dispatch(addNewTimer(inputTimerName, inputTimerDescription, timerColor));
        }
    }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
