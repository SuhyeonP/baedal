const express = require('express');
const {User,Shop}=require('../models')
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
      })
      console.log('not null')
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      console.log('null')
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


router.post('/slogin', (req, res, next) => {
  passport.authenticate('local',(err,user,info)=>{
    if(err){
      console.error(err);
      return next(err)
    }
    if(info){
      return res.status(401).send(info.reason)
    }
    return req.login(user,async(loginErr)=>{
      if(loginErr){
        console.error(loginErr)
        return next(loginErr)
      }
      const client=await User.findOne({
        where:{id:user.id},
        attributes:{
          exclude:['password']
        }
      })
      const shop=await Shop.findOne({
        where:{master:user.id},
        attributes:['id','master','shopName','address','part']
      })
      const LastInfo=Array(client).concat(Array(shop))
      return res.status(200).json(LastInfo);
    })
  })(req,res,next)
});


router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});


router.post('/shop', isLoggedIn, async (req, res, next) => { // POST /user/
  try {
    const shop=await Shop.create({
      address:req.body.address,
      master:req.body.master,
      shopName:req.body.shopName
    })
    const complete=await Shop.findOne({
      where:{id:shop.id},
      include:[{
        model:User,
        attributes:['id','nick']
      }]
    })
    res.status(201).json(complete)
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      }
    });
    console.log(exUser)
    if (exUser!==null) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      userId: req.body.userId,
      nick: req.body.nick,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
