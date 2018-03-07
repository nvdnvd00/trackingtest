import {ADD_NEW_TIMER} from './actionsTypes';
let newTimerId = 0;

//action: add new timer
export const addNewTimer = (inputTimerName,inputTimerDescription,inputTimerColor) => {
    return {
        type: ADD_NEW_TIMER,
        timerId: newTimerId++,
        timerName: inputTimerName,
        timerDescription: inputTimerDescription,
        onDoing: false,
        totalTime: 0,
        timerColor: inputTimerColor,
    }
}