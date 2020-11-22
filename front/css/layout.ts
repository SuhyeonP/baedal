import { css } from '@emotion/react';

const headerList = css`
    display:block;
    width:80vw;
    margin:0 auto;
    padding:2vh 0;
    list-style:none;
    text-align:center;
   li{
    display:inline-block;
    padding:6px;
    margin:2vh 1vw;
    background-color:#b7b7b7;
    border:1px solid black;
    border-radius:6px;
    cursor:pointer;
   }
   
   .shop{
    color:white;
    font-weight:900;
   }
`;
const attend = css`
    display:block;
    text-align:center;
    font-size:14px;
`;
const mainSection = css`
      display:block;
      width:80vw;
      margin:2vh auto 4vh;
      ul{
        list-style:none;
        padding:0;
        text-align:center;
      }
      li{
        width:40vh;
        height:40vh;
        display:inline-block;
      }
      @media (min-width: 1024px){
        
        li{
            background-color:orange;
            margin:2vh;
        }
      }
      @media (max-width: 1023px) and (min-width:678px){
        
      }
      @media (max-width: 677px){
        li{
            background-color:skyblue;
            margin:2vh 0;
        }
      }
`;

const user = ['user1', 'user2', 'user3'];
const shop = ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6'];
export { headerList, user, shop, attend, mainSection };
