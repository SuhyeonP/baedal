module.exports=(sequelize,DataTypes)=>{
  const User=sequelize.define('User',{
    userId:{
      type:DataTypes.STRING(45),
      allowNull:false
    },
    password:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    nick:{
      type:DataTypes.STRING(10),
      allowNull:false
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  })
  User.associate=(db)=>{

  }
  return User
}
