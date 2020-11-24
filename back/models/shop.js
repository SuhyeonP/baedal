module.exports=(sequelize,DataTypes)=>{
  const Shop=sequelize.define('Shop',{
    address:{
      type:DataTypes.STRING(45)
    },
    shopName:{
      type:DataTypes.STRING(10)
    },
    part:{
      type:DataTypes.STRING(10)
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  })
  Shop.associate=(db)=>{
    db.Shop.belongsTo(db.User,{foreignKey:'master'});
  }
  return Shop
}
