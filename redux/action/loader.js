import * as Types from '../constants/actionTypes';

export const openLoader = () => {
  return {
    type: Types.OPEN_LOADER,
  };
};

export const closeLoader = () => {
  return {
    type: Types.CLOSE_LOADER,
  };
};
