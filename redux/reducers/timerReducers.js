import {
    ADD_NEW_TIMER,
    TOGGLE_TIMER,
    ADD_TOTAL_TIMER,
} from '../actions/actionsTypes';
const defaultState = [
    {
        timerId: 0,
        timerName: 'Pine Tree Bank',
        timerDescription: 'Fineancial App - Marketing',
        onDoing: false,
        totalTime: 0,
        color: '#83C382',
    },
    {
        timerId: 1,
        timerName: 'WeatherCorp',
        timerDescription: 'Apple Watch App - Development',
        onDoing: false,
        totalTime: 0,
        color: '#82CBBC',
    },
    {
        timerId: 2,
        timerName: 'SurPrise Entertainment',
        timerDescription: 'Video Game - Coding',
        onDoing: false,
        totalTime: 0,
        color: '#C77C57',
    },
    {
        timerId: 3,
        timerName: "Frank's Restaurant",
        timerDescription: 'New website - Design',
        onDoing: false,
        totalTime: 0,
        color: '#C16672',
    }
]
const timerReducers = (timer = defaultState, action) => {
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
            return timer.map(timer =>

                (timer.timerId === action.timerId) ? {
                    ...timer,
                    onDoing: !timer.onDoing,
                } : {
                        ...timer,
                        onDoing: false,
                    }

            )
        case ADD_TOTAL_TIMER:
            return timer.map(
                item =>
                    (item.onDoing === true) ? {
                        ...item,
                        totalTime: item.totalTime + 1,
                    } : item
            )
        default:
            return timer;
    }
}

export default timerReducers;