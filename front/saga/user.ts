import {all, call, delay, fork, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

// function logInAPI(loginData) {
//   // 서버에 요청을 보내는 부분
//   return axios.post('/user/login', loginData, {
//     withCredentials: true,
//   });
// }
//
// function* logIn(action) {
//   try {
//     const result = yield call(logInAPI, action.data);
//     yield put({ // put은 dispatch 동일
//       type: LOG_IN_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) { // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: LOG_IN_FAILURE,
//       reason: e.response && e.response.data,
//     });
//   }
// }

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    console.log('saga logIn');
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

// function signUpAPI(signUpData) {
//   // 서버에 요청을 보내는 부분
//   return axios.post('/user/', signUpData);
// }
//
// function* signUp(action) {
//   try {
//     // yield call(signUpAPI);
//     yield call(signUpAPI, action.data);
//     yield put({ // put은 dispatch 동일
//       type: SIGN_UP_SUCCESS,
//     });
//   } catch (e) { // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: SIGN_UP_FAILURE,
//       error: e,
//     });
//   }
// }

function signUpAPI() {
  return axios.post('/api/signUp');
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

// function* logOut() {
//   try {
//     // yield call(logOutAPI);
//     yield call(logOutAPI);
//     yield put({ // put은 dispatch 동일
//       type: LOG_OUT_SUCCESS,
//     });
//   } catch (e) { // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: LOG_OUT_FAILURE,
//       error: e,
//     });
//   }
// }

// function logOutAPI() {
//   return axios.post('/api/logout');
// }

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

// function loadUserAPI(userId) {
//   // 서버에 요청을 보내는 부분
//   return axios.get(userId ? `/user/${userId}` : '/user/', {
//     withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해줘요
//   }); // 서버사이드렌더링일 때는, 브라우저가 없어요.
// }
//
// function* loadUser(action) {
//   try {
//     // yield call(loadUserAPI);
//     const result = yield call(loadUserAPI, action.data);
//     yield put({ // put은 dispatch 동일
//       type: LOAD_USER_SUCCESS,
//       data: result.data,
//       me: !action.data,
//     });
//   } catch (e) { // loginAPI 실패
//     console.error(e);
//     yield put({
//       type: LOAD_USER_FAILURE,
//       error: e,
//     });
//   }
// }
//
// function* watchLoadUser() {
//   yield takeEvery(LOAD_USER_REQUEST, loadUser);
// }

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    // fork(watchLoadUser),
    fork(watchSignUp),
  ]);
}