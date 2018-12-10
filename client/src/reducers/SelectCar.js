import {
    SELECT_CAR
} from "./../actions/ActionTypes";
  
  const selectCar = (state = {}, action) => {
    switch (action.type) {
      case SELECT_CAR:
        return action.selectCar;
      default:
        return state;
    }
  };
  
  export default selectCar;
  