import * as Types from '../constants/actionTypes';

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case Types.CLOSE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
