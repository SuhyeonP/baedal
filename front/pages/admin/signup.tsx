import { jsx } from '@emotion/react';
import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Form } from 'antd';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import useInput from '../../exporthing/useInput';
import AppLayout from '../../components/Layout';
import { signup, userOrShop } from '../../css/user';
import { SIGN_UP_REQUEST, LOG_OUT_REQUEST } from '../../reducers/user';

const Signup = () => {
  const [userId, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePw] = useInput('');

  const [sup, setSignup] = useState(false);

  const [pwCheck, setPwCheck] = useState('');
  const [pwError, setPwError] = useState(false);

  const dispatch = useDispatch();

  const { isSignedUp, me, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSignedUp) {
      Router.push('/');
    }
  }, [isSignedUp]);
  useEffect(() => {
    if (signUpError !== '') {
      alert(signUpError);
      Router.reload();
    }
  }, [signUpError]);

  const onChangePwCheck = useCallback((e) => {
    setPwError(e.target.value !== password);
    setPwCheck(e.target.value);
  }, [password]);

  const JoinUs = useCallback((e) => {
    // e.preventDefault()
    if (password !== pwCheck) {
      return setPwError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: { userId, nick, password },
    });
  }, [userId, nick, password, pwCheck]);
  const logOutAndJoin = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
    if (me) {
      document.getElementById('admin-logout').style.display = 'block';
    } else {
      const hi = document.getElementById('admin-logout');
      if (hi) {
        hi.style.display = 'none';
      }
    }
  }, []);

  return (
    <>
      {me === null
        ? (
          <div css={signup}>
            <Form onFinish={JoinUs}>
              <div>
                <label htmlFor="nick">닉네임&nbsp;:&nbsp;</label>
                <input required name="nick" value={nick} onChange={onChangeNick} />
              </div>
              <div>
                <label htmlFor="uid">ID&nbsp;:&nbsp;</label>
                <input required name="uid" value={userId} onChange={onChangeId} />
              </div>
              <div>
                <label htmlFor="pw">PW&nbsp;:&nbsp;</label>
                <input type="password" required name="pw" value={password} onChange={onChangePw} />
              </div>
              <div>
                <label htmlFor="pwc">PWCheck&nbsp;:&nbsp;</label>
                <input type="password" required name="pwc" value={pwCheck} onChange={onChangePwCheck} />
              </div>
              {pwError && <div className="pw-error">비밀번호가 일치하지 않습니다.</div>}
              <button className="joinBtn">가입하기</button>
            </Form>
          </div>
        )
        : (
          <div css={signup}>
            <button css={userOrShop} onClick={logOutAndJoin} typeof="button">로그아웃하고 일반사용자 회원가입</button>
            <Form onFinish={JoinUs}>
              <div>
                <label htmlFor="nick">상점 이름&nbsp;:&nbsp;</label>
                <input required name="nick" value={nick} onChange={onChangeNick} />
              </div>
              <div>
                <label htmlFor="uid">ID&nbsp;:&nbsp;</label>
                <input required name="uid" value={userId} onChange={onChangeId} />
              </div>
              <div>
                <label htmlFor="pw">PW&nbsp;:&nbsp;</label>
                <input type="password" required name="pw" value={password} onChange={onChangePw} />
              </div>
              <div>
                <label htmlFor="pwc">PWCheck&nbsp;:&nbsp;</label>
                <input type="password" required name="pwc" value={pwCheck} onChange={onChangePwCheck} />
              </div>
              {pwError && <div className="pw-error">비밀번호가 일치하지 않습니다.</div>}
              <button className="joinBtn">가입하기</button>
            </Form>
          </div>
        )}

    </>
  );
};
export default Signup;
