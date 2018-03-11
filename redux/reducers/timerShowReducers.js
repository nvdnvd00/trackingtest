import { 
    ADD_NEW_TIMER_SHOW,
    UPDATE_TIMER_SHOW
} from '../actions/actionsTypes';

const timerShowDefault=[]
const timerShowReducers= (timerShow =timerShowDefault,action)=>{
    switch (action.type) {
        case ADD_NEW_TIMER_SHOW:

            return [
                ...timerShow,
                {
                    timerShowId: action.timerShowId,
                    timerShowLeft: action.timerShowLeft,
                    timerShowWidth: action.timerShowWidth,
                    timerShowColor: action.timerShowColor,
                    timerShowName: action.timerShowName,
                }
            ]
        case UPDATE_TIMER_SHOW:
        const Arr=timerShow.map(item=>{
            if (item.timerShowId===action.timerShowId){
                return {...item, timerShowWidth:action.timerShowWidth}
            }
            return item
        })
        return Arr;
        
        default:
            return timerShow;
    }
}


export default timerShowReducers;