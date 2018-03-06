import timerReducers from './timerReducers';
import {combineReducers} from 'redux';

const allReducers = combineReducers (
    {
        timerReducers
    }
);

export default allReducers;