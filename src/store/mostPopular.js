import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { httpMovies } from "../https/apiMovies";
const dataMovies = ref();
const highRate = ref();
const dashTopRate = ref();
const dashTopRateTotal = ref();
const paginationControl = ref(false);
const menuControl = ref(false);
const moviesPlaying = reactive(ref())
const moviesRecom = ref();
const totalPlaying = ref();
const dataGenreList = ref();
const dataUpComing = ref();
const upComingRated = ref();
const dataTrending = ref();
const titleGenre = ref();
const modalGenres = ref(false);
const loadApi = ref();
const loadApiPlaying = ref();
const loadApiUp = ref();
const idCheck = ref();
const moviePrice = ref();
const price = ref();
const Page = ref(1);
const count = ref();
const hasMoreData = ref(false);
const isDarkmode = ref(true);
const hiddenOfSearch=ref(true);
const reloadMovies =reactive(ref())
const darkModeIcon = ref("pi pi-sun hover:text-yellow-500");
const textLoad = ref("Ver Mais");
const inputText = ref()
export const usePopular = defineStore("usePopular", () => {
  //popular

  async function getPopularMovies() {
    try {
      loadApi.value = true;
      const { data } = await httpMovies.get(
        `/movie/popular?language=pt-BR&page`,
        {
          params: {
            page: Page.value,
          },
        }
      );

      paginationControl.value = true;
      menuControl.value = false;
      dataMovies.value = data.results;
      idCheck.value = data.results.map((item) => item.genre_ids);
      loadApi.value = false;
      titleGenre.value = "";
      moviesRecom.value = data.results.filter((item) => {
        return item.vote_average > 7.0;
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  async function getPlayingNow() {
    try {
      loadApiPlaying.value = true;
      const { data } = await httpMovies.get(
        `/movie/now_playing?language=pt-BR`,
        {
          params: {
            page: Page.value,
          },
        }
      );
      
      paginationControl.value = true;
      menuControl.value = false;
      moviesPlaying.value = data.results;
      reloadMovies.value = data.results
      idCheck.value = data.results.map((item) => item.genre_ids);
      loadApiPlaying.value = false;
      titleGenre.value = "";
      
    } catch (error) {
      console.log(error.response);
    }
  }

const searchMovie = computed(()=>{
  if(moviesPlaying.value && inputText.value){
    hiddenOfSearch.value = false
    moviesPlaying.value = moviesPlaying.value.filter(item =>{
     
       return item.title.toLowerCase().includes(inputText.value.toLowerCase())
     })
   }else{
    moviesPlaying.value =  reloadMovies.value 
    hiddenOfSearch.value = true;
    inputText.value = ''
   }
   return moviesPlaying.value
})

  //loadMore
  async function loadMore() {
    try {
      textLoad.value = "Carregando...";
      hasMoreData.value = true;
      nextPage();
      const { data } = await httpMovies.get(
        `/movie/now_playing?language=pt-BR`,
        {
          params: {
            page: Page.value,
          },
        }
      );
      const newItems = data.results;
      moviesPlaying.value = moviesPlaying.value.concat(newItems);
      count.value = moviesPlaying.value.length;
      hasMoreData.value = false;
      textLoad.value = "Ver Mais";
    } catch (error) {
      console.log(error.response);
    }
  }
  function prices(itemPrice) {
    moviePrice.value = (Math.random() * (itemPrice - 100) + 100).toFixed(2);
  }
  //upcoming


  //genres
  async function getGenres(id) {
    try {
      getPopularMovies();
      const { data } = await httpMovies.get(`/genre/movie/list?language=pt-BR`);
      dataGenreList.value = data.genres;
      if (!id) return;

      dataMovies.value = dataMovies.value.filter((item) => {
        return item.genre_ids.includes(id.id);
      });

      titleGenre.value = id.name;
      if (dataMovies.value.length === 0) {
        titleGenre.value = "não localizado";
      }
    } catch (error) {
      console.log(error.response);
    }
  }
  async function getTrendingMovies() {
    try {
      await httpMovies
        .get(`/trending/all/day?language=pt-BR`)
        .then(({ data }) => {
          dataTrending.value = data.results;

          // upComingRated.value =
          data.results.length = 10
          upComingRated.value = data.results.filter((item) => {
            if(!item.release_date) { item.release_date = 'Sem data.'}
            if (item.vote_average >= 7.0)
              return item.vote_average;
          });

          highRate.value = upComingRated.value.length;
        });
    } catch (error) {
      console.log(error.response);
    }
  }

  function darkMode() {
    isDarkmode.value = !isDarkmode.value;
    if (darkModeIcon.value == "pi pi-sun hover:text-yellow-500") {
      darkModeIcon.value = "pi pi-moon";
    } else {
      darkModeIcon.value = "pi pi-sun hover:text-yellow-500";
    }
  }

  function nextPage() {
    Page.value++;
    titleGenre.value = "";
  }

  return {
    darkMode,
    getPopularMovies,
    getGenres,

    getPlayingNow,
    getTrendingMovies,
    prices,
    loadMore,
    price,
    paginationControl,
    moviesRecom,
    loadApi,
    loadApiUp,
    dataGenreList,
    loadApiPlaying,
    dataMovies,
    titleGenre,
    dashTopRate,
    totalPlaying,
    dashTopRateTotal,
    moviesPlaying,
    count,
    Page,
    highRate,
    menuControl,
    inputText,
    modalGenres,
    dataUpComing,
    upComingRated,
    dataTrending,
    moviePrice,
    hasMoreData,
    isDarkmode,
    darkModeIcon,
    textLoad,
    searchMovie,
    hiddenOfSearch
  };
});
