<template>
  <main class="flex-2">

    <section class="p-14 font-sans h-screen bg-gradient-to-b from-gray-800 to-blue-600">
      <h1 class="text-gray-200 uppercase text-center font-semibold text-[2.8rem]">Finalizar Compra</h1>
      <div class="grid grid-cols-2 bg-black bg-opacity-50 p-16 relative ">
        
        <form class="flex flex-col  p-2 gap-5 w-96" >
          <input type="text" placeholder="CPF Titular" v-model="userCpf" @change="handleChange" class="outline-none border-l-2 py-2 rounded-md hover:border-red-300"/>
          <input type="text" placeholder="Cartão"  class="outline-none border-l-2 py-2 rounded-md hover:border-red-300"/>
          <input type="text" placeholder="Cód." class="outline-none border-l-2 py-2 rounded-md hover:border-red-300 w-16"/>
          <input type="text" placeholder="Data Exp" class="outline-none border-l-2 py-2 rounded-md hover:border-red-300 w-24" />

        </form>
        <div class="border-l-2 border-white pl-2 grid grid-cols-4"
    
        >
        <div
        v-for="item in buyItems[0]"
        :key="item.id"
        class="p-2 flex  mt-1"
        >    
        <img
            :src="`https://image.tmdb.org/t/p/original/${item.poster_path}`"
            class="relative shadow-lg w-[100px] sm:w-[100px] xl:w-[50px] h-[50px] transition-all duration-500"
            @click="storeInfo.getInfoFilms(getInfo)"
          />
         <h1 class="text-[0.8rem] w-full text-center pl-2 pr-2 text-gray-100 ">{{ item.title}}</h1>
       
        </div>
  
        

        </div>
        <div class="absolute bottom-0 right-6 p-2 text-[1.7rem] border-l-2 border-white">
          <h1 class=" text-white">Total:{{ buyItems[1].toFixed(2) }} R$</h1>
          <button class="py-2 px-4 bg-green-500 text-gray-300 p-2">Comprar</button>
        </div>
        
      </div>
      
      <div
      @click="backReloadPage"
        class="text-white m-auto fixed bottom-3 right-3 mt-10 p-2 bg-slate-800 rounded-md cursor-pointer hover:bg-slate-700">
        Voltar
    </div>

    </section>
    <Fav />
  </main>
</template>
<script setup>
import Menu from "../components/Menu.vue";
import { usePopular } from "../store/mostPopular";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Fav from "../components/Fav.vue";
import {useCart} from "../store/cart"
const storeCart = useCart()
const dataCart = localStorage.getItem('buyCart')
const buyItems = JSON.parse(dataCart)
const userCpf = ref()
function backReloadPage(){
  window.location.href= "/Movies"
} 
function handleChange(e){

userCpf.value = userCpf.value.replaceAll(".", "")
userCpf.value = userCpf.value.replaceAll("-", "")


}

onMounted(() => {

});
</script>
