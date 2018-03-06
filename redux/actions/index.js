import {ADD_NEW_TIMER} from './actionsTypes';
let newTimerId = 0;

//action: add new timer
export const addNewTimer = (inputTimerName) => {
    return {
        type: ADD_NEW_TIMER,
        timerId: newTimerId++,
        timerName: inputTimerName,
        onDoing: false,
        totalTime: 0,
    }
}