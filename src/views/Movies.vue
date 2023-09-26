<template>
  <main
    :class="{ dark: store.isDarkmode }"
    class="flex-1 h-full font-sans relative"
  >
    <section
      class="flex-1 p-4  bg-bg-FromWhiteMode dark:bg-gradient-to-b from-black from-90% via-bg-blackSite via-20% to-black to-10%"
      v-if="!store.loadApiPlaying"
    
    >
    <div v-if="store.hiddenOfSearch">

   
      <div class="mt-12 ml-4 mb-6" >
        <h1
          class="border-l-[0.1rem] pl-7 border-blue-500 uppercase font-bold text-[1.9rem] bg-opacity-10 text-white font-sans"
        >
          #Trends Top#{{ store.highRate }}
        </h1>
        <p class="ml-8 text-[1.2rem] text-gray-300">Bem avaliados da semana</p>
      </div>
      <div
        class="sm:justify-center sm:items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 h-full"
      >
        <div
          v-for="(item, index) in store.upComingRated"
          :key="index.id"
          class="flex float-left"
        >
          <ListMovies
            :ImgUrl="item.poster_path"
            :getInfo="item"
            :Vote="item.vote_average * 10"
            :DataMovie="item.release_date"
            :incrItem="item"
            :Title="item.title"
            :Price="item.vote_average"
            :ItemCart="item"
          />
        </div>
      </div>
    </div>
      <div class="py-7 block sm:flex">
        <div class="w-full text-2xl font-sanspy-6 px-4 font-semibold">
          <div class="mt-8 relative flex">
            <div
              class="h-52 bg-blue-900 bg-opacity-95 absolute left-28 bottom-2 rounded-md grid grid-cols-2 sm:grid-cols-3"
              v-if="store.modalGenres"
              @click="handleClick"
            >
              <li
                class="text-white list-none text-xs items-center flex justify-center cursor-pointer rounded-md hover:bg-slate-400 text-center"
                v-for="(item, index) in store.dataGenreList"
                :key="index.id"
                @click="store.getGenres(item)"
              >
                {{ item.name }}
              </li>
            </div>
            <p
              class="ml-4 m-auto text-[1.2rem] text-gray-300 uppercase border-l-[0.1rem] px-2"
            >
              {{ store.titleGenre }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-12 ml-4 mb-6 relative">
        <h1
          class="border-l-[0.1rem] pl-7 border-blue-500 uppercase font-bold text-[1.9rem] bg-opacity-10 text-white font-sans cursor-pointer"
        >
          Destaques
        </h1>
        <p class="ml-8 text-[1.2rem] text-gray-300">
          Os melhores filmes para voce assistir
        </p>

        <div
          class="justify-center mt-10 sm:m-auto md:mr-10 absolute right-0 bottom-2"
        >
          <span
            class="p-2 flex gap-10 items-center text-center rounded-lg shadow-black text-white"
            v-if="store.paginationControl"
          >
          <!-- searchpage -->
            <!-- <router-link to="/Search">
              <i
                class="pi pi-search mr-4 flex cursor-pointer text-gray-300 hover:text-green-500 text-xl animate-pulse"
              >
              </i>
            </router-link> -->
          </span>
        </div>
      </div>
      <div v-if="store.loadApiPlaying" class="flex justify-center p-5">
        <i class="pi pi-spin pi-spinner text-white" style="font-size: 2rem"></i>
      </div>
     
      <div
        class="sm:justify-center sm:items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 "
        ref="e"
      >
        <div
          class="m-auto"
          v-for="(item, index) in store.searchMovie"
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

      </div>
   
      <h1
        @click="store.loadMore"
        class="transition-all duration-300 text-gray-600 py-3 px-4 bg-zinc-400 rounded-md text-center cursor-pointer w-44 m-auto hover:bg-zinc-700 hover:text-white"
        v-if="(store.hasMoreData = true)"
      >
        {{ store.textLoad }}
        <i
          class="pi pi-spin pi-spinner text-center"
          v-if="(store.hasMoreData = false)"
          style="font-size: 2rem"
        ></i>
      </h1>

      <div class="ml-4 mb-3"   v-if="store.hiddenOfSearch">
        <h1
          class="border-l-[0.1rem] pl-7 border-blue-500 uppercase font-bold text-[1.6rem] bg-opacity-10 text-white font-sans cursor-pointer"
        >
          Atores
        </h1>
        <p class="ml-8 text-[1.2rem] text-gray-300">O Ator que voce Gosta</p>
      </div>
      <div
        class="sm:justify-center sm:items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 h-full"
        ref="e"
        v-if="store.hiddenOfSearch"
      >
        <div v-for="(actor, index) in storeActor.dataActors" :key="index.id">
          <div
            class="relative shadow-md shadow-black bg-opacity-50 rounded-lg opacity-80 hover:opacity-100 cursor-pointer border-1 hover:border-yellow-200 p-2 transition duration-300"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w200/${actor.profile_path}`"
              class="p-1 rounded-2xl"
            />

            <p class="text-gray-100 text-center">{{ actor.name }}</p>
          </div>
        </div>
      </div>
    </section>
    <Menu class="fixed top-0" />
  </main>

  <Fav />
  
  <Transition>
          <div
            class="p-4 bg-green-500 fixed m-auto md:right-32 top-20 rounded-md text-sm text-center font-bold"
            v-if="storeFav.notification"
          >
            Adicionado aos favoritos
            <i class="pi pi-thumbs-up text-green-900"></i>
          </div>
        </Transition>
        <Transition>
      <div
        class="p-4 bg-green-500 fixed m-auto md:right-32 top-20 rounded-md text-sm text-center text-white font-bold"
        v-if="storeCart.notification"
      >
        Adicionado ao carrinho
        <i class="pi pi-thumbs-up text-green-900"></i>
      </div>
    </Transition>
</template>
<script setup>
import { usePopular } from "../store/mostPopular";
import { useFav } from "../store/favFilm";
import "primeicons/primeicons.css";
import "vue3-carousel/dist/carousel.css";
import Cart from "../components/Cart.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref } from "vue";
import Menu from "../components/Menu.vue";
import Fav from "../components/Fav.vue";
import { useInfo } from "../store/infoFilm";
import { useActors } from "../store/Actors";
import { useCart } from "../store/cart";
import ScrollTop from "primevue/scrolltop";
import ListMovies from "../components/ListMovies.vue";
const pagination = Pagination;
const navigation = Navigation;
const storeActor = useActors();
const carousel = Carousel;
const slide = Slide;
const store = usePopular();
const storeFav = useFav();
const storeInfo = useInfo();
const storeCart = useCart();
const componentRef = ref();
const date = ref();
const years = new Date();
const slidecontrol = ref(false);
const itemPrice = ref()

date.value = years.getUTCFullYear();

function handleClick(e) {
  if (e.isTrusted == true) {
    store.modalGenres = false;
  }
}

onMounted(() => {

  store.getPlayingNow();
  store.getTrendingMovies();
  store.dashTopRate;
  store.modalGenres = false;

  store.getGenres();
  storeActor.getActors();
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

body {
  background: #4b4148;
}
</style>
