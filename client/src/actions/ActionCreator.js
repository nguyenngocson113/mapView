import { SET_VISIBILITY_FILTER, SELECT_CAR } from './ActionTypes'

const setVisibilityFilter = (filter = 'showAll') => ({
    type: SET_VISIBILITY_FILTER,
    filter
});

const selectCar = (selectCar) => ({
    type: SELECT_CAR,
    selectCar
});

export {
    setVisibilityFilter,
    selectCar
}