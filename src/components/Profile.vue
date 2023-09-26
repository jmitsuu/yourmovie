<template>
  <section class="flex gap-2 absolute">
    <header class="p-2 flex justify-center h-20 w-full items-center relative">
      <div class="flex items-center">
        <div>
          <div
            class="absolute h-5 w-5 border-2 border-blue-900 top-2 text-center text-xs bg-red-600 rounded-full"
            v-if="storeCart.cartCount"
          >
            {{ storeCart.cartCount }}
          </div>
          <!-- <ShoppingCartIcon
            v-if="(path = '/Movies')"
            @click="storeCart.modalCart"
            class="transition-all duration-300 mr-2 cursor-pointer h-9 p-2 rounded-md hover:bg-slate-500"
          /> -->
        </div>

        <div>
          <div
            class="absolute h-5 w-5 border-2 border-blue-900 top-2 text-center text-xs bg-red-600 rounded-full"
            v-if="storeFav.favCount"
          >
            {{ storeFav.favCount }}
          </div>
          <BookmarkIcon
            @click="storeFav.modalFav"
            class="transition-all duration-300 mr-2 cursor-pointer h-9 p-2 rounded-md hover:bg-slate-500"
          />
        </div>

        <!--       
        <i
          :class="darkModeIcon"
          class="transition-all duration-300 cursor-pointer mr-2 p-2 rounded-md hover:bg-slate-500"
          @click="darkMode"
        ></i> -->
        <darkModeIcon
          class="h-9 cursor-pointer p-2 rounded-md text-yellow-600 hover:bg-slate-500"
          v-if="!iconChange"
          @click="darkMode"
        />
        <MoonIcon
          v-if="iconChange"
          class="h-9 p-2 text-blue-600 cursor-pointer rounded-md hover:bg-slate-500"
          @click="darkMode"
        />
        <h3
          @click="openEdit = !openEdit"
          class="mr-2 cursor-pointer transition-all duration-300 hover:rounded-sm hover:bg-slate-500 p-2 hover:transition-all hidden sm:block"
        >
          {{ userName }}
        </h3>
        <div class="relative p-4">
          <transition>
            <div
              class="bg-gradient-to-b from-black to-gray-900 opacity-80 text-center rounded-md p-2 transition-all duration-700 absolute top-12 right-2"
              v-if="openEdit"
            >
              <XMarkIcon
                @click="closeModals"
                class="h-9 cursor-pointer float-left hover:opacity-50 w-6 text-white text-xl hover:text-red-500 rounded-full"
              />
              <label class="text-[1.2rem] font-serif font-bold"
                >Alterar senha</label
              >
              <input
                type="text "
                class="text-black outline-none p-2 rounded-md mt-4"
                v-model="newPass"
              />
              <div class="flex justify-center p-2">
                <button
                  class="px-2 py-1 text-center bg-gray-700 rounded-sm hover:bg-slate-500"
                  @click="changePassword"
                >
                  Alterar
                </button>
              </div>
            </div>
          </transition>
        </div>
        <!-- <ArrowRightOnRectangleIcon
          @click="storeAuth.logOut"
          class="h-9 p-2 cursor-pointer rounded-md hover:bg-slate-500"
        /> -->
   
        <span class="block md:hidden">
          <Bars4Icon
            @click="store.menuControl = true"
            class="h-9 p-2 cursor-pointer rounded-md hover:bg-slate-500"
          />
        </span>
      </div>
    </header>
    <div
      class="p-2 bg-red-500 absolute m-auto mt-24 rounded-md text-sm text-center font-bold"
      v-if="storeAuth.notification"
    >
      Logout Efetuado!
    </div>
    <div
      class="p-2 bg-blue-500 absolute m-auto mt-24 rounded-md text-sm text-center font-bold"
      v-if="passChange"
    >
      Senha Alterada!
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  ShoppingCartIcon,
  BookmarkIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Bars4Icon,
} from "@heroicons/vue/24/outline";
import { usePopular } from "../store/mostPopular";
import { useFav } from "../store/favFilm";
import { useCart } from "../store/cart";
import { useAuth } from "../store/auth.js";
const storeAuth = useAuth();
const storeFav = useFav();
const store = usePopular();
const storeCart = useCart();
const userName = ref();
const openEdit = ref(false);
const openUserEdit = ref(false);
const newPass = ref();
const passChange = ref(false);
const iconChange = ref();
const customModal = ref(
  "bg-gradient-to-b from-black to-gray-900 opacity-80 text-center  rounded-md p-2 transition-all duration-700 absolute top-12 right-2"
);
let darkModeIcon = SunIcon;
function handleChange() {
  addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      store.searchMovies();
    }
  });
}

function changePassword() {
  const pass = localStorage.getItem("singIn");
  const teste = JSON.parse(pass);
  teste.filter((el) => {
    el.password = newPass.value;
  });
  localStorage.setItem("singIn", JSON.stringify(teste));
  openEdit.value = false;
  passChange.value = true;
  setTimeout(() => {
    passChange.value = false;
  }, 1200);
}
function closeModals() {
  openEdit.value = false;
  openUserEdit.value = false;
  if (openEdit) {
    customModal.value = "absolute top-[-320px] right-2";
  }
}
//darkmode

function darkMode() {
  store.isDarkmode = !store.isDarkmode;
  if (darkModeIcon == SunIcon) {
    iconChange.value = true;
    darkModeIcon = MoonIcon;
  } else {
    iconChange.value = false;
    darkModeIcon = SunIcon;
  }
}
// const name = localStorage.getItem("singIn");
// const results = JSON.parse(name);
// results.filter((el) => (userName.value = el.name));
handleChange();
onMounted(() => {});
</script>

<style scoped lang="scss"></style>
