import { jsx } from '@emotion/react';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { headerList, user, shop, attend, mainSection, logout, gotoHome } from '../css/layout';
// todo 더미 로그인 하면, 로그아웃버튼 보이게
const AppLayout = ({ children }) => {
  const [userIn, setUserIn] = useState(true);

  const logOut = () => {
    setUserIn(true);
  };

  return (
    <>
      {userIn
        ? (
          <ul css={headerList}>
            {user.map((ele, ind) => <li key={ind}>{ele}</li>)}
            <br />
            {shop.map((element, ind) => <li key={ind} className="shop">{element}</li>)}
            <Link href="/">
              <a css={gotoHome}>
                <HomeOutlined />
                <p>home</p>
              </a>
            </Link>
          </ul>
        )
        : <p css={logout} id="admin-logout" onClick={logOut}>Log out</p>}

      <h2 css={attend}>이용자들은 주문을 할수있고, 가게는 주문을 할수있어요!!</h2>
      <div css={mainSection}>
        {children}
      </div>
    </>
  );
};

export default AppLayout;
// todo footer에 가게 요청으로 로그인하고 신청할수있는 폼 만들기 백엔드작업도 필요
