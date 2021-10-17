const auth = {
  userid: {
    checker(id) {
      const regex =
        /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      this.recentUserid = id;

      return regex.test(id);
    },

    alert: '이메일 형식에 맞게 입력해 주세요.',

    completed: false,

    recentUserid: null
  },

  password: {
    checker(pw) {
      if (pw.length > 12 || pw.length < 6) return false;

      if (pw.match(/[^a-zA-Z0-9]/g)) return false;

      this.recentPassword = pw;

      return true;
    },

    alert: '영문 또는 숫자를 6~12자 입력하세요.',

    completed: false,

    recentPassword: null
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
      return auth.password.completed && auth.password.recentPassword === pw;
    },

    alert: '패스워드가 일치하지 않습니다.',

    completed: false
  },

  getUserInfo() {
    return {
      userid: auth.userid.recentUserid,
      password: auth.password.recentPassword
    };
  }
};

export default auth;
