import React, { useCallback, useState } from 'react';
import { CheckSquareOutlined, ControlOutlined, DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { singleShop } from '../../css/shop';
import useInput from '../../exporthing/useInput';

const menuPart = [{ part: 'main' }, { part: 'sub' }, { part: 'drink' }];// menu수정할수있게 todo

const Shop = () => {
  const [master, setMaster] = useState(true);
  const [seeN, setSeeN] = useState('123');
  const [userMenuBag, setBag] = useState<string[]>([]);
  const [userPriceBag, setPrice] = useState<number[]>([]);
  const [cp, onChangeCp] = useInput('');
  const [menuName, onChangeName] = useInput('');
  const [modifyMode, setModify] = useState(false);

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
      return prev;
    });
    setPrice((prev) => {
      prev.push(mp);
      return prev;
    });
  }, [userMenuBag, userPriceBag]);
  const gotoOrder = useCallback(() => {
    const menu = userMenuBag.join(',');
    const price:number = userPriceBag.reduce((sum, value) => sum + value);
    console.log(`${menu},${price}원 입니다.`);
  }, [userMenuBag, userPriceBag]);

  const changeTheMenu = useCallback(() => {
    console.log(`${menuName},${cp} right?`);
    setModify(false);
  }, [menuName, cp]);

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
            {menuPart.map((x) => (
              <li onClick={() => openTable(x.part)} key={x.part}>
                {x.part}
                &nbsp;
                {master && <EditOutlined onClick={() => changeName(x.part)} />}
              </li>
            ))}
          </ul>
          <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150410_215%2Fhakdiary_1428652773295KSpdV_JPEG%2F%25B9%25AB%25C7%25D1%25B5%25B5%25C0%25FC_%25C2%25A9_%25C1%25A4%25C7%25F6%25B5%25B7_%252815%2529.jpg&type=sc960_832" id="img-shop" />
          {menuPart.map((ele) => {
            const hi = ele.part;
            return (
              <>
                <div className="part-table" id={`rmt-${hi}`}>
                  <h2>
                    {hi}
                    {!master && <p onClick={gotoOrder}>주문하기</p>}
                  </h2>
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
