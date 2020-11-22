/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import AppLayout from '../components/Layout';
// todo 가게마다 관리버튼 만들고 redux로 자기 가계일때 관리하기 되게
//todo redux로 메인가게 가져올거라서 map돌릴 예정
const Home = () => (
  <>
    <AppLayout>
      <ul>
        <li>가게1</li>
        <li>가게2</li>
        <li>가게3</li>
        <li>가게4</li>
        <li>가게5</li>
        <li>가게6</li>
      </ul>
    </AppLayout>
  </>
);

export default Home;
