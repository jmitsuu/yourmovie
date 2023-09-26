<template>
  <Menu class="bg-opacity-90" />

  <main :class="{ dark: store.isDarkmode }" class="flex-1 h-full">
    <section
      class="flex-1 p-14 font-sans h-full bg-bg-FromWhiteMode dark:bg-gradient-to-b from-black from-90% via-bg-blackSite via-20% to-black to-10%"
    >
      <div class="shadow-2xl">
        <span class="relative">
          <input
            type="text"
            class="w-full p-4 rounded-lg relative first-letter:outline-none bg-slate-200 font-bold text-slate-900 text-2xl"
            placeholder="O que está Procurando ?"
            v-model="inputText"
       
          />
          <i
            class="pi pi-search absolute right-0 bottom-1 text-3xl text-black mr-4 flex cursor-pointer hover:text-slate-500"
            @click="searchMy"
          ></i>
        </span>
        <div
          class="bg-opacity-30 p-2 rounded-md flex justify-between pt-4 flex-wrap"

        >
          <li
            class="text-white list-none text-xs md:text-[1rem] p-1 border-[0.1rem] items-center flex flex-wrap justify-center cursor-pointer rounded-xl hover:border-blue-700 text-center"
            v-for="(item, index) in store.dataGenreList"
            :key="index.id"
            @click="store.getGenres(item)"
          >
            {{ item.name }}
          </li>
        </div>
      </div>
      <h1 class="text-center text-white text-[1.8rem] font-bold mt-10">
        {{ store.titleGenre }}
      </h1>

      <section class="flex-1 p-14 h-full" >
        <h1
          class="text-white text-[1.9rem] font-bold border-l-[0.1rem] border-blue-600 pl-2 m-6"
          v-if="searchOn"
        >
          Recomendados
        </h1>
        <!-- <button
        v-if="store.loadApi"
        type="button"
        class="bg-indigo-500 text-center text-white p-2 rounded-md flex justify-center items-center m-auto"
        disabled
      >
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        Processando...
      </button> -->
        <carousel
          :items-to-show="3"
          autoplay="0"
          pauseAutoplayOnHover="true"
          transition="1000"
          wrapAround="true"
          v-if="searchOn"
       
        >
          <slide v-for="(item, index) in store.moviesRecom" :key="index.id">
            <div
              class="relative flex scale-90 transition duration-300 bg-black"
            >
              <img
                :src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
                class="w-[600px] cursor-pointer rounded-md border-2 hover:border-blue-700 transition duration-300 shadow hover:shadow-stone-50"
              />
              <p
                class="text-white p-2 bg-gradient-to-tl from-gray-800 rounded-md bg-opacity-75 bottom-5 right-10 absolute font-extrabold text-[1.0rem]"
              >
                {{ item.title }}
              </p>
              <i
                class="Secchild pi pi-star-fill text-yellow-300 pr-1 scale-75 text-xl bg-slate-800 p-2 absolute top-0 bg-opacity-50 rounded-md right-0"
              >
                {{ item.vote_average.toFixed(0) * 10 }}%</i
              >
            </div>
          </slide>
          <template #addons>
            <pagination />
            <navigation />
          </template>
        </carousel>
        <h1
          class="text-white text-[1.9rem] font-bold border-l-[0.1rem] border-blue-600 pl-2 m-6"
        >
          Encontre seu filme
        </h1>
        <!-- <button
        type="button"
        v-if="store.loadApi"
        class="bg-indigo-500 text-center text-white p-2 rounded-md flex justify-center items-center m-auto"
        disabled
      >
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        Processando...
      </button> -->

        <div
          class="sm:justify-center sm:items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 h-full"
          ref="e"
        >
          <div
            class="m-auto"
            v-for="(item, index) in  handleChange"
            :key="index.id"
          >
    
            <ListMovies
              :ImgUrl="item.poster_path"
              :getInfo="item"
              :Vote="item.vote_average * 10"
              :DataMovie="item.release_date.slice(0, -6)"
              :incrItem="item"
              :Title="item.title"
              :Price="item.vote_average"
              :ItemCart="item"
            />
          </div>

          <Transition>
            <div
              class="p-2 bg-green-500 fixed m-auto md:right-32 top-10 rounded-md text-sm text-center font-bold"
              v-if="storeFav.notification"
            >
              Adicionado aos favoritos
              <i class="pi pi-thumbs-up text-green-900"></i>
            </div>
          </Transition>
        </div>
      </section>
    </section>
  </main>

  <Fav />
</template>
<script setup>

import { usePopular } from "../store/mostPopular";
import { useFav } from "../store/favFilm";
import "primeicons/primeicons.css";
import "vue3-carousel/dist/carousel.css";
import ListMovies from "../components/ListMovies.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import Menu from "../components/Menu.vue";
import Fav from "../components/Fav.vue";
import { useInfo } from "../store/infoFilm";
import { httpMovies } from "../https/apiMovies";

const carousel = Carousel;
const slide = Slide;
const pagination = Pagination;
const navigation = Navigation;
const store = usePopular();
const storeFav = useFav();
const storeInfo = useInfo();
const inputText = ref();
const searchOn = ref(true)

// async function handleChange() {
//   try {
   
//       const { data } = await httpMovies.get(
//         `/search/multi?query=${inputText.value}&include_adult=false&language=pt-BR`
//       );
//       store.dataMovies = data.results
//       console.log(data.results)
//     } catch (error) {
//       console.log(error.response);
//     }
// }

// handleChange()

const handleChange = computed( ()=>{

  if( store.dataMovies  && inputText.value){
  
store.dataMovies.filter(async (item)=>{
  try {
  const {data} = await httpMovies.get(`/search/movie?query=${inputText.value}&include_adult=false&language=pt-BR`);
  console.log(data.results)
  return store.dataMovies =   data.results
} catch (error) {
  console.log(error.message)
}
})
  }

  return store.dataMovies

})


async function searchMy(){
  const {data} = await httpMovies.get(`/search/movie?query=${inputText.value}&include_adult=false&language=pt-BR`);
  console.log(data.results)
  store.dataMovies = data.results

}
onMounted(() => {
  store.getPopularMovies();
  store.getGenres();
  setInterval(() => {

  }, 2000);
});
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from .v-leave-to {
  opacity: 0;
}

.Secchild {
}

.Firstchild:hover .Secchild {
  display: block;
}
</style>
