/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { CheckSquareOutlined, ControlOutlined, SettingOutlined } from '@ant-design/icons';
import { singleShop } from '../../css/shop';

const menuPart = [{ part: 'main' }, { part: 'sub' }, { part: 'drink' }];// menu수정할수있게 todo

const Shop = () => {
  const [master, setMaster] = useState(true);
  const [seeN, setSeeN] = useState('123');

  const changeName = useCallback((part) => {
    const modiName = prompt('바꿀이름을 적어주세요');
    const checking = confirm(`${modiName}이 맞습니까?`);
    if (checking) {
      console.log(modiName);
      // todo dispatch로 요청보내고 성공하면, 새로고침
    } else {
      alert('취소되었습니다.');
    }
  }, []);
  const openTable = useCallback((part) => {
    document.getElementById(`rmt-${seeN}`).style.display = 'none';
    setSeeN(part.toString());
    document.getElementById(`rmt-${part}`).style.display = 'block';
  }, [seeN]);

  return (
    <>
      <div css={singleShop}>
        <h3>
          shopName&nbsp;
          {master && <ControlOutlined />}
        </h3>
        <input hidden id="rmt-123" />
        <div>
          <ul>
            {menuPart.map((ele) => (
              <li onClick={() => openTable(ele.part)} key={ele.part}>
                {ele.part}
                &nbsp;
                {master && <SettingOutlined onClick={() => changeName(ele.part)} />}
              </li>
            ))}
          </ul>
          {menuPart.map((ele) => (
            <div className="part-table" id={`rmt-${ele.part}`}>
              <h2>{ele.part}</h2>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>price</th>
                    {master
                      ? <th>수정</th> : <th><CheckSquareOutlined /></th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>price</td>
                    {master
                      ? <td>수정</td> : <td>담기</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
// todo table 페이징
export default Shop;
