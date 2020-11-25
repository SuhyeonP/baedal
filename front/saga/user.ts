import { all, call, delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_SHOP_FAILURE,
  LOG_IN_SHOP_REQUEST,
  LOG_IN_SHOP_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SHOP_REQUEST,
  SIGN_UP_SHOP_SUCCESS,
  SIGN_UP_SHOP_FAILURE,
  SIGN_UP_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
} from '../reducers/user';

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      reason: e.response && e.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function shopLoginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/slogin', loginData);
}

function* ShoplogIn(action) {
  try {
    const result = yield call(shopLoginAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SHOP_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_SHOP_FAILURE,
      reason: e.response && e.response.data,
    });
  }
}

function* watchShopLogIn() {
  yield takeEvery(LOG_IN_SHOP_REQUEST, ShoplogIn);
}

function signUpAPI(signUpData) {
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({ // put은 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function shopSignUpAPI(signUpData) {
  return axios.post('/user/shop', signUpData);
}

function* shopSignUp(action) {
  try {
    const result = yield call(shopSignUpAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SHOP_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_SHOP_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchShopSignUp() {
  yield takeEvery(SIGN_UP_SHOP_REQUEST, shopSignUp);
}

function loadUserAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해줘요
  }); // 서버사이드렌더링일 때는, 브라우저가 없어요.
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log(result.data,"asdf");
    yield put({ // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchShopSignUp),
    fork(watchShopLogIn),
    fork(watchLoadUser),
  ]);
}

