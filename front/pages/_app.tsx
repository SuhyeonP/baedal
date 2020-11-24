import * as React from 'react';
import createSagaMiddleware, { Task } from '@redux-saga/core';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import App, { AppProps } from 'next/app';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import axios from 'axios';
import AppLayout from '../components/Layout';
import reducer, { IReducerState } from '../reducers';
import rootSaga from '../saga';
import { LOAD_USER_REQUEST } from '../reducers/user';

interface Props extends AppProps {
  store: Store<IReducerState>;
}
//
// class SUhyeon extends App<Props> {
//   static async getInitialProps(context) {
//     const { ctx, Component } = context;
//     let pageProps = {};
//     const state = ctx.store.getState();
//     const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (ctx.isServer && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     if (!state.user.me) {
//       ctx.store.dispatch({
//         type: LOAD_USER_REQUEST,
//       });
//     }
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx) || {};
//     }
//     return { pageProps };
//   }
//
//   render() {
//     const { Component, store, pageProps } = this.props;
//     return (
//       <Provider store={store}>
//         <Helmet
//           title="Suhyeon"
//           htmlAttributes={{ lang: 'ko' }}
//           meta={[{
//             charSet: 'UTF-8',
//           }, {
//             name: 'viewport',
//             content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
//           }, {
//             httpEquiv: 'X-UA-Compatible', content: 'IE=edge',
//           }, {
//             name: 'description', content: 'suhyeon',
//           }, {
//             name: 'og:title', content: 'suhyeon',
//           }, {
//             name: 'og:description', content: 'suhyeon',
//           }, {
//             property: 'og:type', content: 'website',
//           }, {
//             property: 'og:image', content: '',
//           }]}
//           link={[{
//             rel: 'shortcut icon', href: '/favicon.ico',
//           }, {
//             rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
//           }, {
//             rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
//           }, {
//             rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
//           }]}
//         />
//         <AppLayout>
//           <Component {...pageProps} />
//         </AppLayout>
//       </Provider>
//     );
//   }
// }

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

export default withRedux(configureStore)(withReduxSaga(SUhyeon));
