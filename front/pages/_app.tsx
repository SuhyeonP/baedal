import * as React from 'react';
import createSagaMiddleware, { Task } from 'redux-saga';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withRedux from 'next-redux-wrapper';
import App, { AppProps, AppContext } from 'next/app';
import Helmet from 'react-helmet';
import axios from 'axios';
import { Provider } from 'react-redux';
import AppLayout from '../components/Layout';
import reducer, { IReducerState } from '../reducers';
import rootSaga from '../saga';
import { LOAD_USER_REQUEST } from '../reducers/user';

interface Props extends AppProps {
  store: Store<IReducerState>;
}

function SUhyeon({ Component, pageProps }) {

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
interface IStore extends Store{
    sagaTask?:Task;
}

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store: IStore = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

SUhyeon.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  axios.defaults.headers.Cookie = '';
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

export default withRedux(configureStore)(SUhyeon);
