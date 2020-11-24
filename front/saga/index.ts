import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';

import { backUrl } from '../exporthing/config';

axios.defaults.baseURL = `${backUrl}`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(user),
  ]);
}
