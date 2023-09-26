import { defineStore } from "pinia";
import { ref, computed } from "vue";
const isAuthenticated = ref(false);
const users = ref();
const findUser = ref();
const notification = ref(false);
const msgLogin = ref();
const msgError = ref();

export const useAuth = defineStore("useAuth", () => {
  function singIn(userEmail, userPassword) {
    if (!userEmail && !userPassword && !isAuthenticated.value) return;
    //examples
    const convertUser = localStorage.getItem("singIn");
    findUser.value = JSON.parse(convertUser);
    if (findUser.value == null ) {
      msgError.value = "Email/senha incorreto(s) ou Não cadastrados";
      setTimeout(() => {
        msgError.value = "";
      }, 1800);
    }
    findUser.value.filter((item) => {
      if (item.email !== userEmail || item.password !== userPassword ) {
        msgError.value = "Email/senha incorreto(s) ou Não cadastrados";
        setTimeout(() => {
          msgError.value = "";
        }, 1800);
      }
      if (item.email === userEmail && item.password === userPassword) {
   
        isAuthenticated.value = true;
        setTimeout(() => {
          window.location.href = "/Movies";
        }, 1200);

        if (isAuthenticated.value == true) {
          localStorage.setItem("token", JSON.stringify(isAuthenticated.value));
          notification.value = true;
          msgLogin.value = "Login Efetuado com sucesso";
        }

        return;
      }
    });
  }
  function errorInfo() {}

  function logOut() {
    notification.value = true;
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/Login";
    }, 1200);
  }

  return {
    singIn,
    logOut,
    errorInfo,
    msgLogin,
    msgError,
    notification,
    isAuthenticated,
  };
});
