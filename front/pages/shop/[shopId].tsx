import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { CheckSquareOutlined, ControlOutlined, DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { singleShop } from '../../css/shop';
import useInput from '../../exporthing/useInput';

const menuPart = [{ part: 'main' }, { part: 'sub' }, { part: 'drink' }];// menu수정할수있게 todo

const Shop = () => {
  const [master, setMaster] = useState(false);
  const [seeN, setSeeN] = useState('123');
  const [userMenuBag, setBag] = useState<string[]>([]);
  const [userPriceBag, setPrice] = useState<number[]>([]);
  const [cp, onChangeCp] = useInput('');
  const [menuName, onChangeName] = useInput('');
  const [modifyMode, setModify] = useState(false);
  const [basket, setBasket] = useState(false);

  const changeName = useCallback((part) => {
    const modiName = prompt('바꿀이름을 적어주세요');
    const checking:boolean = confirm(`${modiName}이 맞습니까?`);
    if (checking) {
      console.log(modiName);
      // todo dispatch로 요청보내고 성공하면, 새로고침
    } else {
      alert('취소되었습니다.');
    }
  }, []);
  const changeMenu = useCallback((mn, mp) => {
    setModify(true);
    console.log(mn, mp, 'change');
  }, []);
  const deleteMenu = useCallback((mn, mp) => {
    console.log(mn, mp, 'delete');
  }, []);

  const openTable = useCallback((part) => {
    document.getElementById(`rmt-${seeN}`).style.display = 'none';
    setSeeN(part.toString());
    document.getElementById(`rmt-${part}`).style.display = 'block';
  }, [seeN]);

  const pushMyBag = useCallback((mn:string, mp:number) => {
    setBag((prev) => {
      prev.push(mn);
      const put = document.createElement('p');
      put.textContent = mn;
      document.getElementById('userBag').append(put);
      return prev;
    });
    setPrice((prev) => {
      prev.push(mp);
      return prev;
    });
    setBasket(true);
  }, [userMenuBag, userPriceBag]);
  const gotoOrder = useCallback(() => {
    if (userPriceBag.length === 0) {
      alert('아무것도 선택하지 않으셨습니다.');
      return;
    }
    const menu = userMenuBag.join(',');
    const price:number = userPriceBag.reduce((sum, value) => sum + value);
    console.log(`${menu},${price}원 입니다.`);
    const lastCheck = confirm(`${menu},${price}원 입니다.`);
    if (lastCheck) {
      console.log('send to info');
      setBag([]);
      setPrice([]);
    } else {
      alert('취소되었습니다.');
      setBag([]);
      setPrice([]);
      setBasket(false);
      document.getElementById('userBag').innerHTML = null;
    }
  }, [userMenuBag, userPriceBag]);

  const changeTheMenu = useCallback(() => {
    console.log(`${menuName},${cp} right?`);
    setModify(false);
  }, [menuName, cp]);

  const emptybaskcet = useCallback(() => {
    document.getElementById('userBag').innerHTML = null;
    setBag([]);
    setPrice([]);
    setBasket(false);
  }, []);

  return (
    <>
      <div css={singleShop}>
        <h3>
          shopName&nbsp;
          {master && <ControlOutlined />}
        </h3>
        <input hidden id="rmt-123" />
        <div>
          <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150410_215%2Fhakdiary_1428652773295KSpdV_JPEG%2F%25B9%25AB%25C7%25D1%25B5%25B5%25C0%25FC_%25C2%25A9_%25C1%25A4%25C7%25F6%25B5%25B7_%252815%2529.jpg&type=sc960_832" id="img-shop" />
          <ul>
            {menuPart.map((x) => (
              <li onClick={() => openTable(x.part)} key={x.part}>
                {x.part}
                &nbsp;
                {master && <EditOutlined onClick={() => changeName(x.part)} />}
              </li>
            ))}
          </ul>
          <div id="userBag" className="userBag" />
          {basket && <button onClick={emptybaskcet}>비우기</button>}
          {menuPart.map((ele) => {
            const hi = ele.part;
            return (
              <>
                <div className="part-table" id={`rmt-${hi}`}>
                  <h4>
                    {hi}
                    {!master && <p onClick={gotoOrder}>주문하기</p>}
                  </h4>
                  {/* todo <div>img-slick예정</div> */}
                  <table>
                    <thead>
                      <tr>
                        <th>name</th>
                        <th>price</th>
                        {master
                          ? <th>수정</th>
                          : <th>담기</th>}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {modifyMode
                          ? (
                            <>
                              <td><input value={menuName} onChange={onChangeName} /></td>
                              <td><input value={cp} onChange={onChangeCp} type="number" /></td>
                              <td onClick={changeTheMenu}>go</td>
                            </>
                          )
                          : (
                            <>
                              <td>name</td>
                              <td>price</td>
                            </>
                          )}
                        {master
                          ? (
                            <td>
                              <DeleteOutlined onClick={() => deleteMenu(ele.part, ele)} />
                              <EditOutlined onClick={() => changeMenu(ele.part, ele)} />
                            </td>
                          )
                          : <td><CheckSquareOutlined onClick={() => pushMyBag(ele.part.toString(), Number(ele.part.length))} /></td>}
                      </tr>
                      <tr>
                        {modifyMode
                          ? (
                            <>
                              <td><input value={menuName} onChange={onChangeName} /></td>
                              <td><input value={cp} onChange={onChangeCp} type="number" /></td>
                              <td onClick={changeTheMenu}>go</td>
                            </>
                          )
                          : (
                            <>
                              <td>name</td>
                              <td>price</td>
                            </>
                          )}
                        {master
                          ? (
                            <td>
                              <DeleteOutlined onClick={() => deleteMenu(ele.part, ele)} />
                              <EditOutlined onClick={() => changeMenu(ele.part, ele)} />
                            </td>
                          )
                          : <td><CheckSquareOutlined onClick={() => pushMyBag(ele.part.toString(), Number(ele.part.length))} /></td>}
                      </tr>
                      <tr>
                        {modifyMode
                          ? (
                            <>
                              <td><input value={menuName} onChange={onChangeName} /></td>
                              <td><input value={cp} onChange={onChangeCp} type="number" /></td>
                              <td onClick={changeTheMenu}>go</td>
                            </>
                          )
                          : (
                            <>
                              <td>name</td>
                              <td>price</td>
                            </>
                          )}
                        {master
                          ? (
                            <td>
                              <DeleteOutlined onClick={() => deleteMenu(ele.part, ele)} />
                              <EditOutlined onClick={() => changeMenu(ele.part, ele)} />
                            </td>
                          )
                          : <td><CheckSquareOutlined onClick={() => pushMyBag(ele.part.toString(), Number(ele.part.length))} /></td>}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
// todo table 페이징
export default Shop;
// {Array(dumy.menuList).map((ele) => (
//     ele.map((x) => (
//         <li onClick={() => openTable(x)} key={x}>
//           {x}
//           &nbsp;
//           {master && <SettingOutlined onClick={() => changeName(x)} />}
//         </li>
//     ))
// ))}
