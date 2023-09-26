<template>
  <section
    class="flex p-24 h-screen items-center justify-center bg-gradient-to-b  from-black  bg-bg-FromWhiteMode"
  >
    <main
      class="flex rounded-md justify-center items-center p-9"
    >
      <form @submit.prevent="Register" class="p-2  h-full flex flex-col items-center gap-8 bg-opacity-30  w-96 bg-yellow-900  rounded-md ">
        <h1 class="text-white text-center font-serif text-[3.0rem] mb-8">
          Registrar
        </h1>
        <div class="flex flex-col w-56 justify-center">
          <span class="relative">
            <input
              type="text"
              placeholder="Seu Nome"
              @click="iconShow"
              class="m-2 pl-7 p-8 py-3 text-left w-full bg-yellow-100 text-[0.9rem] outline-none rounded-md"
              v-model="userName"
              required
            />
            <i :class="iconName"></i>
          </span>

          <span class="relative">
            <input
              type="email"
              placeholder="Seu e-mail"
              @click="iconShow"
              class="m-2 pl-7 p-8 py-3 text-left w-full text-[0.9rem] outline-none rounded-md"
              v-model="userEmail"
              required
            />
            <i :class="iconEmail"></i>
          </span>

          <span class="relative">
            <input
              type="password"
              placeholder="Sua senha"
              @click="iconShow"
              class="m-2 pl-7 p-8 py-3 text-left w-full  text-[0.9rem] outline-none rounded-md"
              v-model="passWord"
              required
            />
            <i :class="incoPass"></i>
          </span>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="px-10 ml-2 py-2 bg-blue-200 hover:bg-blue-300 text-gray-800 rounded-md font-serif text-[1.3rem]"
            @click="Register()"
          >
            Criar
          </button>
        </div>
        <p
          v-if="changeToLogin"
          class="text-center text-[1.3rem] text-yellow-200"
        >
          {{ info }}
        </p>
      </form>
    </main>
  </section>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import { ref, onMounted } from "vue";
import { useAuth } from "../store/auth.js";
const store = useAuth();
const userName = ref();
const userEmail = ref();
const passWord = ref();
const info = ref();
const iconName = ref("top-0");
const iconEmail = ref("top-0");
const incoPass = ref("top-0");

function Register() {
  if (userName.value && userEmail.value && passWord.value) {
    const data = [
      {
        name: userName.value,
        email: userEmail.value,
        password: passWord.value,
      },
    ];
    localStorage.setItem("singIn", JSON.stringify(data));
    changeToLogin();
  }
}
function changeToLogin() {
  setTimeout(() => {
    info.value = "Usuario Criado com Sucesso.";
    window.location.href = "/Login";
  }, 1000);
}

function iconShow(e) {
  iconName.value = "pi pi-user-plus  absolute left-3 top-5 transition-all";
  iconEmail.value = "pi pi-user absolute left-3 top-5 transition-all";
  incoPass.value = "pi pi-key absolute left-3 top-5 transition-all";
  //   if(e.explicitOriginalTarget.type == 'text'){
  //   }
  // if(e.explicitOriginalTarget.type == 'email'){
  // }
  // if(e.explicitOriginalTarget.type == 'password'){
  // }
}
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.teste2 {
  display: none;
}

</style>
