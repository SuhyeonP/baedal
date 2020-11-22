import * as React from 'react';
import { headerList, user, shop, attend, mainSection } from '../css/layout';
//todo 더미 로그인 하면, 로그아웃버튼 보이게
const AppLayout = ({ children }) => (
  <>
    <ul css={headerList}>
      {user.map((ele) => <li>{ele}</li>)}
      <br/>
      {shop.map((element) => <li className="shop">{element}</li>)}
    </ul>
    <h2 css={attend}>이용자들은 주문을 할수있고, 가게는 주문을 할수있어요!!</h2>
    <div css={mainSection}>
      {children}
    </div>
  </>
);

export default AppLayout;
