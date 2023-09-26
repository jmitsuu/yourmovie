<template>
  <nav
    class="bg-gradient-to-b    bg-black bg-opacity-95 shadow-black shadow-md flex h-14 w-full items-center text-white"
  >
    <ul class="justify-start hidden sm:flex ">
      <li
        v-for="(item, index) in menuItems"
        :key="index.id"
        class="border-gray-300 active:text-purple-600"
      >
        <router-link :to="item.name" class="text-left p-2 flex text-white rounded-sm cursor-pointer">
          <PlayCircleIcon class="h-6" /> {{ item.title }}
        </router-link>
      </li>
    </ul>

    <div
      class="h-20 w-52 top-0 right-0 fixed rounded-l-lg bg-gradient-to-b from-black to-gray-800 items-center text-white"
      v-if="store.menuControl"
    >

      <li
        v-for="(item, index) in menuItems"
        :key="index.id"
        class="list-none hover:bg-slate-500 p-2 w-full rounded-md text-white"
      >
        <router-link :to="item.name" class="text-left p-2 flex">
         <PlayCircleIcon class="h-6"  /> {{ item.title }}
        </router-link>
      </li>
    </div>
    <div class=" mx-auto items-center flex ">
      <Transition>
        <input v-if="openSearch" v-model="store.inputText"  type="text"  placeholder="Procurar..." class="rounded-md  bg-blue-900 bg-opacity-20 text-white p-2" />
      </Transition>

        <MagnifyingGlassIcon v-if="!openSearch" @click="!openSearch ? openSearch = true : openSearch = false" class=" text-white w-5 cursor-pointer " />
        <XMarkIcon v-if="openSearch" @click="openSearch = false" class=" text-white w-5 cursor-pointer " />
      </div>
    <Profile class=" right-0" />
    <Cart/>
    
  </nav>
  
</template>

<script setup>
import Profile from "./Profile.vue";
import Cart from "../components/Cart.vue";
import { ref, computed } from "vue";
import { usePopular } from "../store/mostPopular";
import { PlayCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/solid";
const store = usePopular();
const props = defineProps({

  textTitle:String
})
const slideWidth = ref('w-90')
const openSearch = ref(false);
const inputText =ref('')
const menuItems = ref([
  // {
  //   id: 2,
  //   name: "Dashboard",
  //   title: "Dashboard",
  //   icon: "icon pi pi-home",
  // },
  // {
  //   id: 1,
  //   name: "Home",
  //   title: "Home",
  //   icon: "icon pi pi-home",
  // },
  {
    id: 2,
    name: "Movies",
    title: "Filmes",

  },

  // {
  //   id: 3,
  //   name: "Series",
  //   title: "Series",
  //   icon: "icon pi pi-play",
  // },
]);

inputText.value = props.textTitle
</script>

<style>
.active {
color: #414141; ;
opacity: 90%;
}
</style>
