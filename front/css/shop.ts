import { css } from '@emotion/react';

const singleShop = css`
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
            span{
                font-size:18px;
            }
        }
       }
       .part-table{
        display:none;
       }
    @media (min-width: 1024px){
        h3{
            font-size:32px;
        }
        ul{
        display:inline-flex;
        width:40vw;
        justify-content:space-between;
        li{
            padding:5px;
            font-size:25px;
        }
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
    }
`;

export { singleShop };
