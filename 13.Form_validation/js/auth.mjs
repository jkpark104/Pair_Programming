const auth = {
  inputID: null,

  inputPassword: null,

  userid: {
    checker(id) {
      const regex =
        /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      auth.inputID = id;

      return regex.test(id);
    },

    alert: '이메일 형식에 맞게 입력해 주세요.',

    completed: false
  },

  password: {
    checker(pw) {
      if (pw.length > 12 || pw.length < 6) return false;

      if (pw.match(/[^a-zA-Z0-9]/g)) return false;

      auth.inputPassword = pw;

      return true;
    },

    alert: '영문 또는 숫자를 6~12자 입력하세요.',

    completed: false
  },

  username: {
    checker(name) {
      return name.length >= 1;
    },

    alert: '이름을 입력해 주세요.',

    completed: false
  },

  'confirm-password': {
    checker(pw) {
      return auth.password.completed && auth.inputPassword === pw;
    },

    alert: '패스워드가 일치하지 않습니다.',

    completed: false
  },

  getUserInfo() {
    console.log({
      userid: auth.inputID,
      password: auth.inputPassword
    });
  }
};

export default auth;
