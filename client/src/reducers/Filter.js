import {
    SET_VISIBILITY_FILTER
  } from "./../actions/ActionTypes";
  
  const visibilityFilter = (state = '', action) => {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter;
      default:
        return state;
    }
  };
  
  export default visibilityFilter;
  