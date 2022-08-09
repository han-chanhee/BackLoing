// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// function initialize(passport, getUserByEmail) {
//   // 이메일,패스워드, 인증이왈료될떄 done
//   const authenticateUser = async (email, password, done) => {
//     // 사용자 이메일 받기
//     const user = getUserByEmail(email);
//     // 사용자가이메일이없으면
//     if (user == null) {
//       // 첫번쨰 매개변수 서버 오류 , 사용자 못찾을떄
//       return done(null, false, { message: 'No user with that email' });
//     }
//     // 패스워드 오류  구현
//     try {
//       // 사용자가입력한 암호와 비교 사용자가있을때
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         // 비번일치 안할때
//         return done(null, false, { message: 'Password incorrect' });
//       }
//     } catch (e) {
//       return done(e);
//     }
//   };

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id));
//   });
// }

// module.exports = initialize;
