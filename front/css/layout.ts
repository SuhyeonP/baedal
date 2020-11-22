import { css } from '@emotion/react';

const post = ['pink', 'yellow', 'mint', 'brown'];
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
        padding:2vh 0;
        background-image:url("https://mblogthumb-phinf.pstatic.net/MjAxODExMTlfMTgg/MDAxNTQyNTg5MjI1NTYz.3sUBfnwWvTKYe9AZXADttafmWkYCQv0sGfjGr47kyAwg.4mDnQfOZxDL4k0u7kFeOHdXOhGusYWk4jvyvAvAqGwIg.PNG.guehae95/5-2.png?type=w800");
        position:relative;
        box-shadow: 2px 3px 8px #44444459;
      }
      a{
        display:inline-block;
        text-decoration:none;
      }
      img{
            width:90%;
            margin-bottom:1vh;
      }
      table{
        display:block;
        width:90%;
        text-align:left;
      }
          
      button{
        display:inline-block;
        width:15px;
        height:15px;
        background-color:inherit;
        border:0;
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -280px -348px;
        position:absolute;
        right:1vh;
        bottom:1vh;
      }
      .goto-order{
        font-size:0;
        display:inline-block;
        width:20px;
        height:20px;
        background-color:inherit;
        border:0;
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -8px -332px;
        position: absolute;
        right: 1vh;
        bottom: 1vh;
        border-radius: 50%;
      }
      @media (min-width: 1024px){
        th{
            width:12vh;
          }  
        li{
            margin:2vh;
            box-shadow: 2px 3px 8px #44444459;
            padding-top:17px;
            padding-bottom:0;
        }
        table{
            margin:1vh auto;
        }
        td{
            line-height:26px;
            font-size:19px;
          }
      }
      @media (max-width: 1023px) and (min-width:678px){
        td{
            line-height:22px;
          }
          
          th{
            width:12vh;
          }  
      }
      @media (max-width: 677px){
        li{
            margin:2vh 0;
        }
        td{
            line-height:18px;
          }
        img{
            margin-bottom:0;
        }
        table{
            margin:1vh;
        }
        
      }
`;

const user = ['user1', 'user2', 'user3'];
const shop = ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6'];
export { headerList, user, shop, attend, mainSection };
