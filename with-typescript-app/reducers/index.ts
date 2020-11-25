import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user, { IUserReducerState } from './user';
import shop, { IShopReducerState } from './shop';

export interface IReducerState {
    user: IUserReducerState;
    shop: IShopReducerState;
}

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        shop,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
