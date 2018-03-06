import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import Dashboard from '../Dashboard/dashboard';


const StackNav = StackNavigator({
    DashboardScreen:{
        screen: Dashboard,
    },
},{
    initialRouteName: 'DashboardScreen',
})

export default StackNav;