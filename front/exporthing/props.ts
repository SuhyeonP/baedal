interface menu{
    name:string
    price:number
    possible:boolean
}
interface menuList{
    part:string
    detailList:menu[]
}
interface shop{
    shopId:number,
    menuList:menuList[]
}

const dumy:shop = {
  shopId: 1,
  menuList: [
    { part: 'main',
      detailList: [
        { name: 'menu1', price: 123, possible: false },
        { name: 'menu1', price: 123, possible: false }],
    },
    { part: 'sub',
      detailList: [
        { name: 'menu1', price: 123, possible: false },
        { name: 'menu1', price: 123, possible: false }],
    },
  ],
};
