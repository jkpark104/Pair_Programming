const auth = {
  userid: {
    checker(id) {
      const regex =
        /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return regex.test(id);
    },

    alert: '이메일 형식에 맞게 입력해 주세요.',

    completed: false
  },

  password: {
    checker(pw) {
      if (pw.length > 12 || pw.length < 6) return false;
      return /[A-Za-z0-9]{6,12}/.test(pw);
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
      if (pw.length > 12 || pw.length < 6) return false;
      return /[A-Za-z0-9]{6,12}/.test(pw);
    },

    alert: '영문 또는 숫자를 6~12자 입력하세요.',

    completed: false
  }
};

export default auth;
