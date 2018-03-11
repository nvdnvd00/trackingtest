import { 
    ADD_NEW_TIMER,
    TOGGLE_TIMER ,
    ADD_TOTAL_TIMER,
    ADD_NEW_TIMER_SHOW,
    UPDATE_TIMER_SHOW
} from './actionsTypes';

let newTimerId = 0;
let newTimerShowId=0;

//action: add new timer
export const addNewTimer = (inputTimerName, inputTimerDescription, inputTimerColor) => {
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
//toggle one timer
export const toggleTimer = (timerId) =>{
    return {
        type: TOGGLE_TIMER,
        timerId: timerId,
    }
}

export const addTotalTimer=() =>{
    return {
        type: ADD_TOTAL_TIMER,
    }
}



export const addNewTimerShow=(inputTimerShowLeft,inputTimerShowWidth,inputColor,inputShowName)=>{
    return{
        type: ADD_NEW_TIMER_SHOW,
        timerShowId: newTimerShowId++,
        timerShowLeft: inputTimerShowLeft,
        timerShowWidth: inputTimerShowWidth,
        timerShowColor: inputColor,
        timerShowName: inputShowName
    }
}
export const updateTimerShow = () =>{
    return {
        type: UPDATE_TIMER_SHOW,
    }
}