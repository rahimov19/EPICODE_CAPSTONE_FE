import { FETCH_CHEQUES } from "../actions";

const initialState = {
  cheques: [],
};

const chequesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHEQUES:
      return { ...state, cheques: action.payload };

    default:
      return state;
  }
};

export default chequesReducer;
