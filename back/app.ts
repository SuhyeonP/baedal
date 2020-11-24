import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as mysql from 'mysql';
import dbconfig from './config/database';

const connection = mysql.createConnection(dbconfig);

connection.connect((err) => {
  if (!err) {
    console.log('DB연결 성공');
  } else {
    console.log('DB연결 실패 ㅠㅠ');
  }
});

const prod:boolean = process.env.NODE_ENV === 'production';
dotenv.config();

const app = express();
app.set('port', prod ? process.env.PORT : 3050);

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res, next) => {
  res.send('im ready! hello im back server using Typescript');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${process.env.PORT}`);
});
