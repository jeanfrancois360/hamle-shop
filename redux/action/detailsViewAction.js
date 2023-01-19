import * as Types from '../constants/actionTypes';

export const openDetailsView = (items) => (dispatch) => {
 
  dispatch({
    type: Types.OPEN_DETAILS_VIEW,
    payload: { items },
  });
};

export const closeDetailsView = () => (dispatch) => {
  dispatch({
    type: Types.CLOSE_DETAILS_VIEW,
  });
};
