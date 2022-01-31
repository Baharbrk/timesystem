import { loginUser } from "../services";

export default {
  name: "Login",
  data: () => ({ email: null, password: null, userName: null, userId: null, failLogIn: false }),
  methods: {
    login(e) {
      e.preventDefault();
      sessionStorage.clear();
      loginUser({ Username: this.email, Password: this.password })
          .then((response) => {
              if (response.status !== 404) {
                  this.userId = response.userId;
                  this.userName = response.username
                  sessionStorage.setItem("userName", response.username);
                  sessionStorage.setItem("userId", response.userId);
                  sessionStorage.setItem("isAdmin", response.isAdmin);

                  this.$router.push("/zeiterfassen");
              } else {
                  this.failLogIn = true;
              }
        })
        .catch((e) => {
          console.log(this, e);
          this.failLogIn = true;
        });
    },
  },
};
