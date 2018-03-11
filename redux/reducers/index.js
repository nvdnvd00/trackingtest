import timerReducers from './timerReducers';
import timerShowReducers from './timerShowReducers';
import {combineReducers} from 'redux';

const allReducers = combineReducers (
    {
        timerReducers,timerShowReducers,
    }
);

export default allReducers;