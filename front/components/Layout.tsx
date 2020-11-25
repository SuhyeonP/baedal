import { jsx } from '@emotion/react';
import Link from 'next/link';
import * as React from 'react';
import { ReactElement, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { headerList, user, shop, attend, mainSection, logout, gotoHome } from '../css/layout';
import { LOG_IN_REQUEST, LOG_IN_SHOP_REQUEST, LOG_OUT_REQUEST } from '../reducers/user';
import LogOut from './logout';
// todo 더미 로그인 하면, 로그아웃버튼 보이게
interface Props {
  children: ReactElement;
}

const AppLayout:React.FunctionComponent<Props> = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const LoginDummy = useCallback((userId) => {
    console.log(userId);
    dispatch({ type: LOG_IN_REQUEST,
      data: { userId, password: 'test' },
    });
  }, []);
  const LoginShopDummy = useCallback((userId, code) => {
    dispatch({ type: LOG_IN_SHOP_REQUEST,
      data: { userId, password: 'test', master: code },
    });
  }, []);
  return (
    <>
      {me ? <LogOut /> : (
        <ul css={headerList}>
          {user.map((ele, ind) => <li onClick={() => LoginDummy(ele)}>{ele}</li>)}
          <li onClick={() => LoginDummy('dumy')}>testUser</li>
          <br />
          {shop.map((element, ind) => <li onClick={() => LoginShopDummy(element, ind + 5)} className="shop">{element}</li>)}
          <Link href="/">
            <a css={gotoHome}>
              <HomeOutlined />
              <p>home</p>
            </a>
          </Link>
        </ul>
      )}

      <h2 css={attend}>이용자들은 주문을 할수있고, 가게는 주문을 할수있어요!!</h2>
      <div css={mainSection}>
        {children}
      </div>
    </>
  );
};

export default AppLayout;
// todo footer에 가게 요청으로 로그인하고 신청할수있는 폼 만들기 백엔드작업도 필요
