import { FETCH_CATS, FETCH_MENU } from "../actions";

const initialState = {
  categories: [],

  menu: [],
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATS:
      return { ...state, categories: action.payload };
    case FETCH_MENU:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
};

export default menuReducer;
