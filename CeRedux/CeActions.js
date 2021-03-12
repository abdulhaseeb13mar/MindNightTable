import ActionTypes from './actionTypes';

export const CeUserAction = (userinfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const CesetCurrentProductAction = (productInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: productInfo,
    });
  };
};

export const CesetFavAction = (favItem) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const CeremoveFavAction = (itemId) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const CeaddCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const CeremoveCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const CeresetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
