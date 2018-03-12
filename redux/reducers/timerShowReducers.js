import {
    ADD_NEW_TIMER_SHOW,
    UPDATE_TIMER_SHOW
} from '../actions/actionsTypes';

const timerShowDefault = [

]
const timerShowReducers = (timerShow = timerShowDefault, action) => {
    switch (action.type) {
        case ADD_NEW_TIMER_SHOW:

            return [
                ...timerShow,
                {
                    timerShowId: action.timerShowId,
                    timerShowLeft: action.timerShowLeft,
                    timerShowWidth: 0,
                    timerShowColor: action.timerShowColor,
                    timerShowName: action.timerShowName,
                    totalTimerShow: 0,
                }
            ]
        case UPDATE_TIMER_SHOW:
            const Arr = timerShow.map(item => {
                if (item.timerShowId === action.timerShowId) {
                    return {
                        ...item,
                        timerShowWidth: action.timerShowWidth - item.timerShowLeft,
                        totalTimerShow: item.totalTimerShow + 1
                    }
                }
                return item
            })
            return Arr;

        default:
            return timerShow;
    }
}


export default timerShowReducers;