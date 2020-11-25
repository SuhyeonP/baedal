import produce from 'immer';

export const initialState = {
  mainShops: [], // 화면에 보일 가게
  isAddingComment: false,
  addCommentErrorReason: '',
  commentAdded: false,
  singleShop: null,
  hasMoreShop: false,
};
export type IShopReducerState = typeof initialState;

export const LOAD_MAIN_SHOPS_REQUEST = 'LOAD_MAIN_SHOPS_REQUEST';
export const LOAD_MAIN_SHOPS_SUCCESS = 'LOAD_MAIN_SHOPS_SUCCESS';
export const LOAD_MAIN_SHOPS_FAILURE = 'LOAD_MAIN_SHOPS_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MAIN_SHOPS_REQUEST: {
      draft.mainShops = !action.lastId ? [] : draft.mainShops;
      draft.hasMoreShop = action.lastId ? draft.hasMoreShop : true;
      break;
    }
    case LOAD_MAIN_SHOPS_SUCCESS: {
      //draft.mainShops = draft.mainShops.concat(action.data);
      draft.mainShops = action.data;
      draft.hasMoreShop = action.data.length === 6;
      break;
    }
    case LOAD_MAIN_SHOPS_FAILURE: {
      break;
    }
    default: {
      break;
    }
  }
});
