import { combineReducers } from 'redux';
import user, { IUserReducerState } from './user';
import shop, { IShopReducerState } from './shop';

export interface IReducerState {
    user: IUserReducerState;
    shop: IShopReducerState;
}

const rootReducer = combineReducers({
  user,
  shop,
});

export default rootReducer;
