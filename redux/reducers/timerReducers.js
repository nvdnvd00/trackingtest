import {ADD_NEW_TIMER} from '../actions/actionsTypes';

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
            
    
        default:
            return timer;
    }
}

export default timerReducers;