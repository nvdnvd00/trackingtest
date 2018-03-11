import { 
    ADD_NEW_TIMER_SHOW,
    UPDATE_TIMER_SHOW
} from '../actions/actionsTypes';

const timerShowReducers= (timerShow =[],action)=>{
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
        return timerShow.map((item)=>{
          
            (item.timerShowId===timerShow.length-1)?
            {...item,timerShowWidth: timerShow.timerShowWidth++}:item
            
        })
        
        default:
            return timerShow;
    }
}


export default timerShowReducers;