import { FETCH_CATS, FETCH_MENU, FETCH_TABLE_POSITIONS } from "../actions";

const initialState = {
  categories: [],
  tablePositions: [],
  menu: [],
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_POSITIONS: {
      return { ...state, tablePositions: action.payload };
    }
    case FETCH_CATS:
      return { ...state, categories: action.payload };
    case FETCH_MENU:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
};

export default menuReducer;
