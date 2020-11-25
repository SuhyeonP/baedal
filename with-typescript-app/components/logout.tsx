import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { logout } from '../css/layout';
import { LOG_OUT_REQUEST } from '../reducers/user';

const LogOut = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };
  return (
    <>
      <p css={logout} id="admin-logout" onClick={logOut}>Log out</p>
    </>
  );
};

export default LogOut;
