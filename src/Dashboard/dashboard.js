//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';


// create a component
class Dashboard extends Component {
    render() {
        
        return (
            
       
            <View style={styles.container}>
                <Text>Dashboard</Text>
               
            
               { alert(moment().locale("vi").format("dddd, Do MMMM "))}
 
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Dashboard;
