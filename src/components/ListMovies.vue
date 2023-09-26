
<template>
  
  <div class="">
    <div     v-if="store.loadApiPlaying" class="flex justify-center p-5">
        <i class="pi pi-spin pi-spinner text-white" style="font-size: 2rem"></i>
      </div>
    <div   class="h-full w-full m-auto  p-2 "
      
    >
 
      <div
     
    
      :class="'Firstchild relative scale-90 transition duration-300  rounded-sm hover:opacity-80 '"
      >
      <Transition>
    
        <div
    
          class="relative flex"
          @mouseover="hoverTitle = true"
          @mouseleave="hoverTitle = false"
        >
       
          <router-link to="/Descriptions">    
            <img
            v-once
              :class="!ImgUrl? 'opacity-0' : 'relative opacity-100 shadow-lg bg-red-400  hover:shadow-red-500 w-[400px] sm:w-[600px] xl:w-[300px] rounded-md transition-all duration-800'"
              :src="`https://image.tmdb.org/t/p/w500/${ImgUrl}`"
           
              @click="storeInfo.getInfoFilms(getInfo)"
            />
          </router-link>
        </div>
      </Transition>
        <i
          class="Secchild pi pi-star-fill text-yellow-300 pr-1 scale-75 text-md bg-slate-800 p-2 absolute top-0 bg-opacity-50 rounded-md right-0"
        >
          {{ Vote.toFixed(0) }}%</i
        >

        <i
     
          v-if="hoverTitle"
        
          class="pi pi-bookmark-fill text-xl text-white absolute top-0 cursor-pointer mt-2 animate-bounce hover:text-gray-800 stroke-1 hover:stroke-2"
          @click="storeFav.incrementFav(incrItem)"
        ></i>
        <div class="text-center block">
          <p
            class="text-xs text-gray-200 absolute bottom-2 right-2 p-2 bg-bg-blackSite rounded-md bg-opacity-75"
          >
            {{ DataMovie }}
          </p>
          <p class="text-sm text-gray-200 absolute top-10 hidden" >
            {{ Title }}
          </p>
        </div>
      </div>
      <!-- Prices -->
      <div class="text-center text-white p-3" @click="getprices">
        <p v-if="!ImgUrl">Em breve..</p>
        <!-- <p
          
  
          class=" border-[0.1rem] bg-slate-900 rounded-md text-sm font-semibold opacity-90 cursor-pointer font-mono hover:bg-slate-400"
          @click="storeCart.incrementCart(ItemCart, itemPrice)"
        
        >
          R${{ itemPrice }}

          <i class="pi pi-shopping-cart"></i>
        </p> -->
      </div>
      
    </div>

  </div>
      

</template>
<script setup>
import { useInfo } from "../store/infoFilm";
import { useFav } from "../store/favFilm";
import { usePopular } from "../store/mostPopular";
import { useCart } from "../store/cart";
import { ref, onMounted } from "vue";
const storeInfo = useInfo();
const storeCart = useCart();
const storeFav = useFav();
const store = usePopular();
const itemPrice = ref();
const hoverTitle = ref(false);

const props = defineProps({
  ImgUrl: String,
  getInfo: Array,
  Vote: Number,
  incrItem: Object,
  DataMovie: String,
  Price: Number,
  Title: String,
  ItemPrice: Number,
  ItemCart: String,
});
function findPrices() {
  itemPrice.value = (Math.random() * (10 - 100) + 100).toFixed(2);
}
findPrices();
onMounted(() => {
  findPrices();
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from .v-leave-to {
  opacity: 0;
}

</style>
