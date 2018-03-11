//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import PropTypes from 'prop-types';

// create a component
class AddTimer extends Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 60,
                borderBottomWidth: 0.5,
                borderBottomColor: '#E5E5E5'
            }}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}
                    onPress={this.props.onPress}
                >
                    <View style={{ flex: 5,justifyContent:'center' }}>
                        <Text style={{ left: 10,fontSize:16 }}>Add timer</Text>
                    </View>
                    <View style={{ flex: 1,alignItems:'flex-end' }}>
                        <Image
                            source={require('../../assets/add.png')}
                            style={{ width: 40, height: 40 ,right: 10}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
AddTimer.propTypes = {
    onPress: PropTypes.func,
}
// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default AddTimer;
