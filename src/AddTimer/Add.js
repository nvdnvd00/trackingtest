//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addNewTimer } from '../../redux/actions';
import ModalDropdown from 'react-native-modal-dropdown';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DashboardScreen' })],
});

class HeaderTitle extends Component {
    render() {
        return (
            <View >

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>New Timer</Text>
                </View>

            </View>
        );
    }
}
// create a component
class AddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            newTimerName: '',
            colorChoose: '',
            newTimerDescription: ''
        })
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <HeaderTitle />,
    });

    render() {
        return (
            <View style={{


                justifyContent: 'flex-start',
                alignItems: 'center',
                //height: 64
            }}>
                <View>
                    <TextInput style={{
                        height: 40,
                        width: 300,
                        margin: 10,
                        padding: 10,
                        borderColor: 'grey',
                        borderWidth: 1,
                        color: 'black',
                        borderRadius: 30
                    }}

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
                    <TextInput style={{
                        height: 40,
                        width: 300,
                        margin: 10,
                        padding: 10,
                        borderColor: 'grey',
                        borderWidth: 1,
                        color: 'black',
                        borderRadius: 30
                    }}

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
                        flex: 1, alignItems: 'center', height: 40,
                        margin: 10,
                        marginRight: 0,
                        padding: 10,
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30
                    }}>
                        <Text>Choose Color</Text>
                    </View>
                    <ModalDropdown
                        style={{

                            height: 40,
                            flex: 1,
                            alignItems: 'center',
                            margin: 10,
                            marginLeft: 0,
                            padding: 10,
                            borderColor: 'grey',
                            borderWidth: 0.5,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,


                        }}
                        options={['antiquewhite', 'aqua', 'aquamarine','azure','blueviolet','floralwhite','forestgreen']}
                        dropdownStyle={{ height: undefined, width: 100 }}
                        dropdownTextStyle={{ fontSize: 14, color: 'black' }}
                        
                        onSelect={(idx, value) => {
                            this.setState({ colorChoose: value });

                        }}
                    />
                </View>

                <TouchableOpacity style={{
                    alignItems: 'center',
                    margin: 10,
                    borderWidth: 3,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: 'blue',

                }}
                    onPress={() => {
                        if (!this.state.newTimerName.trim()) { 
                            Alert.alert('Error', 'Please enter Timer name!'); 
                            return; 
                        }
                        if (!this.state.colorChoose.trim()) { 
                            Alert.alert('Error', 'Please choose Timer color!'); 
                            return; 
                        }

                        this.props.onClickAdd(this.state.newTimerName, this.state.newTimerDescription, this.state.colorChoose);
                        this.props.navigation.dispatch(resetAction);
                    }}


                >

                    <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 18 }}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (inputTimerName, inputTimerDescription, timerColor) => {
            dispatch(addNewTimer(inputTimerName, inputTimerDescription, timerColor));
        }
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddComponent);
