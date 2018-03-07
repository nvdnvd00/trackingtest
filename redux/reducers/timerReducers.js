import {
    ADD_NEW_TIMER,
    TOGGLE_TIMER
} from '../actions/actionsTypes';

const timerReducers= (timer =[],action)=>{
    switch (action.type) {
        case ADD_NEW_TIMER:
            return [
                ...timer,
                {
                    timerId: action.timerId,
                    timerName: action.timerName,
                    timerDescription: action.timerDescription,
                    onDoing: action.onDoing,
                    totalTime: action.totalTime,
                    color: action.timerColor,
                }
            ]
        case TOGGLE_TIMER:
            return timer.map(timer=>
                (timer.timerId === action.timerId)?{
                    ...timer,
                    onDoing: !timer.onDoing,
                }:timer

            )
    
        default:
            return timer;
    }
}

export default timerReducers;