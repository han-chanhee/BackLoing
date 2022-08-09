// // 환경변수 로드 만약 개발환경이
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// const express = require('express');
// const app = express();
// // 비밀번호를 해쉬화
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');

// const initializePassport = require('./passport-config');
// initializePassport(passport, (email) => {
//   users.find((user) => user.email === email);
// });
// // express-session
// // express-flash

// // !주의 사용하면안되는데 이렇게 데이터베이스를 하지만 인증 애플리케이션 위주이기 때무에 전체 데이터 베이스에 연결 하면 좆됨진짜
// //  https://www.youtube.com/watch?v=XlvsJLer_No&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM   : 링크 보면서 공부
// //   https://www.youtube.com/watch?v=Ud5xKCYQTjM

// const users = [];

// // ejs 구문을 사용하고 있다고 알려줌 실제 템플릿에서 사용이 가능하다
// app.set('view-engine', 'ejs');
// // url 로된 인코딩을 확장옵션으로 전달받고싶음
// // dotenv와 사용세션과 함께 작동할 여권 세션을 사용
// app.use(express.urlencoded({ extended: false }));
// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     //세션 빈값 저장
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   // 특정 요청 페이지
//   res.render('index.ejs', { name: 'chlwpdns' });
// });

// app.get('/login', (req, res) => {
//   // 특정 요청 페이지

//   res.render('login.ejs');
// });

// app.post(
//   '/login',
//   // 실패 성공 인증 라우터
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })
// );

// //////////

// app.get('/register', (req, res) => {
//   // 특정 요청 페이지
//   res.render('register.ejs');
// });

// app.post('/register', async (req, res) => {
//   //해시함수 비동기 암호화 사용

//   try {
//     // 10은 가장좋은 기본적인 해시함수 10으로 설정
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     // 새로운 사용자 등록
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect('/login');
//   } catch {
//     res.redirect('/register');
//   }
//   // name 필드에 해당하는 것으로 접속 변수내부 접속입니다
//   console.log(users);
// });

// app.listen(3000);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
