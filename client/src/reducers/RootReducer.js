import { combineReducers } from 'redux';
import selectCar from './SelectCar';
import filter from './Filter';
export default combineReducers({
    selectCar,
    filter
});