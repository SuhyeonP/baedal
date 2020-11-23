/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { shopControl } from '../css/layout';
import AppLayout from '../components/Layout';
// todo 가게마다 관리버튼 만들고 redux로 자기 가계일때 관리하기 되게
// todo redux로 메인가게 가져올거라서 map돌릴 예정
const link = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAxMjRfMjM4%2FMDAxNTQ4MjU1Nzk3Mjc2.M446tdO5AvW5XVvmH9r9FBcEZ1e2Sze604_5pEiq8Uog.YTfFcx2hliEiIkIjg9-3jBPSm7yxEGqWsmD4l_sUzo0g.JPEG.seooooya%2FIMG_2203.JPG&type=sc960_832';
const Home = () => {
  const [shop, setShop] = useState(false);

  useEffect(() => { // 동작 잘함 :) todo 가게 더미데이터로 스크롤이벤트!!
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

      }
    }

    addEventListener('scroll', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
    };
  }, []);

  const shop6 = ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6'];

  return (
    <>
      <ul>
        {shop6.map((ele, ind) => (
          <li className="home-list" key={ind}>
            <img src={link} />
            <table className="home-table">
              <tr>
                <th>가게이름:</th>
                <td>{ele}</td>
              </tr>
              <tr>
                <th>종류:</th>
                <td>cafe</td>
              </tr>
              <tr>
                <th>가게주소:</th>
                <td>Address</td>
              </tr>
              <tr>
                <th>대표메뉴:</th>
                <td> menu1</td>
                <td>menu2</td>
              </tr>
            </table>
            {shop
              ? (
                <button css={shopControl} />
              )
              : (
                <Link href="/shop/1">
                  <a className="goto-order">주문하러가기</a>
                </Link>
              )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
