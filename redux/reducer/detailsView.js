import * as Types from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case Types.OPEN_DETAILS_VIEW: {
      console.log('detailsview active');
      return {
        items: action.payload.items,
      };
    }

    case Types.CLOSE_DETAILS_VIEW: {
      console.log('detailsview close');
      return null;
    }
    default:
      return state;
  }
};
