<template>

  <main :class="{ dark: storePopular.isDarkmode }" class="flex-1 font-sans relative"

  >
    <section
      class="flex-1 p-10 font-serif bg-bg-FromWhiteMode dark:bg-gradient-to-b from-black from-90% via-bg-blackSite via-20% to-black to-10%"
    >
      <section id="menu" >
        <div class="ml-4 mb-6">
          <h1
            class="border-l-[0.1rem] pl-7 border-blue-500 uppercase font-bold text-[1.9rem] bg-opacity-10 text-white font-sans cursor-pointer"
          >
            No Ar #
          </h1>
          <p class="ml-8 text-[1.2rem] text-gray-300">As melhores Series</p>
        </div>

        <carousel
          :items-to-show="1"
          :autoplay="slidecontrol"
          pauseAutoplayOnHover="true"
          transition="3000"
          snapAlign="center"
          class="shadow-inset"
          @slide-end="watch"
        >
          <slide
            v-for="(item, index) in store.dataAirToday"
            :key="index.id"
            class="h-[500px] relative"
          >
            <img
              :src="`https://image.tmdb.org/t/p/original/${item.backdrop_path}`"
              class="h-[full] w-[full] bg-black"
            />
            <div
              class="absolute bottom-0 left-5 uppercase font-mono w-[50%] rounded-lg bg-bg-blackSite opacity-80 p-2"
            >
              <h2 class="text-[5rem] font-bold text-blue-100 text-center">
                {{ item.name }}
              </h2>
              <p class="text-[0.9rem] font-serif text-gray-200 float-left">
                {{ item.overview }}
              </p>
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </section>
      <section class="all h-full">
        <div class="float-right">
          <span
            class="p-2 flex gap-10 items-center text-center rounded-lg shadow-black text-white"
          >
            <router-link to="/Search">
              <i
                class="pi pi-search mr-4 flex cursor-pointer text-gray-300 hover:text-green-500 text-xl animate-pulse"
              >
              </i>
            </router-link>
            <i
              class="pi pi-angle-left cursor-pointer hover:opacity-20"
              @click="store.backPage"
            ></i>
            {{ store.count }}
            <i
              class="pi pi-angle-right cursor-pointer hover:opacity-20"
              @click="store.nextPage"
            ></i>
          </span>
        </div>
        <Transition>
          <div class="ml-4 mb-6 mt-10"   v-if="!store.loadApiPlaying">
            <h1
              class="border-l-[0.1rem] pl-7 border-blue-500 uppercase font-bold text-[1.9rem] bg-opacity-10 text-white font-sans cursor-pointer"
            >
              Para Voce
            </h1>
            <p class="ml-8 text-[1.2rem] text-gray-300">As melhores Series</p>

            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-8">
              <div
                v-for="(item, index) in store.dataOnAir"
                :key="index.id"
                class="relative scale-90 hover:scale-95 transition duration-300"
              >
            
                <img
                  :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
                  class="cursor-pointer opacity-90 hover:opacity-100"
                />
           
                <i
                  class="Secchild pi pi-star-fill text-yellow-300 pr-1 scale-75 text-md font-bold bg-slate-800 p-2 absolute top-0 bg-opacity-50 rounded-md right-0"
                >
                  {{ item.vote_average.toFixed(0) * 10 }}%</i
                >
                <i
                  class="pi pi-bookmark-fill text-xl text-white absolute top-0 cursor-pointer mt-2 hover:text-gray-800 stroke-1 hover:stroke-2"
                  @click="storeFav.incrementFav(item)"
                ></i>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <section class="actors"></section>
    </section>
    <Menu class="fixed top-0" />
    <Transition>
      <div
        class="p-4 bg-green-500 fixed m-auto md:right-32 top-20 rounded-md text-sm text-center font-bold"
        v-if="storeFav.notification"
      >
        Adicionado aos favoritos
        <i class="pi pi-thumbs-up text-green-900"></i>
      </div>
    </Transition>
    
  </main>

  <Fav />

</template>
<script setup>
import { usePopular } from "../store/mostPopular";
import { useFav } from "../store/favFilm";
import "primeicons/primeicons.css";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref } from "vue";
import Menu from "../components/Menu.vue";
import Fav from "../components/Fav.vue";
import Cart from "../components/Fav.vue";
import { useSeries } from "../store/series.js";
import {useCart} from "../store/cart"
const storePopular = usePopular();
const store = useSeries();
const storeFav = useFav();
const storeCart = useCart()
const slidecontrol = ref(false);
const carousel = Carousel;
const slide = Slide;
const myCarousel = ref(null);
const pagination = Pagination;
const navigation = Navigation;


// function watch(data){
// console.log(data.currentSlideIndex)
// if(data.currentSlideIndex >15){
//   store.nextPage ++;
//   store.getAirToday()

// }

// }
window.addEventListener("click", () => {
  slidecontrol.value = true;

});

// function handleChange() {
//   addEventListener("keydown", (e) => {
//     if (e.key == "Enter") {
//       store.searchMovies();
//     }
//   });
// }
// handleChange();
onMounted(() => {
  store.getAirToday();
  store.getOnTheAir();
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
