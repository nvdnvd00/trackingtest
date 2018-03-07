import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import Dashboard from '../Dashboard/dashboard';
import AddComponent from '../AddTimer/Add';


const StackNav = StackNavigator({
    DashboardScreen:{
        screen: Dashboard,
    },
    AddComponentScreen:{
        screen: AddComponent
    }
},{
    initialRouteName: 'DashboardScreen',
})

export default StackNav;