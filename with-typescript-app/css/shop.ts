import { css } from '@emotion/react';

const singleShop = css`
display:block;
     h3{
            display:block;
            text-align:center;
            margin:0;
     }
        text-align:center;
       ul{
        display:block;
        margin:0 auto;
        li{
            display:inline-block;
            cursor:pointer;
            span{
                font-size:18px;
            }
        }
       }
       .part-table{
        display:none;
       }
       .userBag{
        display:block;
        text-align:center;
        border:1px solid green;
        padding:2px;
        margin:4px;
        p{
            display:inline-block;
            padding:0 5px;
        }
       }
    @media (min-width: 1024px){
        h3{
            font-size:32px;
        }
        ul{
        display:flex;
        width:40vw;
        justify-content:space-between;
        li{
            padding:5px;
            font-size:25px;
        }
       }
       img{
        width:30vw;
        margin:15px 0
       }
       table{
        width:50vw;
        margin:0 auto;
       }
       
       td{      
       }
    }
    @media (max-width: 1023px) and (min-width:678px){}
    @media (max-width: 677px){
       h3{
            font-size:28px;
        }
        ul{
        width:80vw;
        li{
            padding:5px;
            font-size:18px;
        }
       }
      table{
        width:100%;
       }
    }
`;

export { singleShop };
