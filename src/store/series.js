import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { httpMovies } from "../https/apiMovies";

const dataAirToday = ref();
const dataOnAir = ref();
const dataPopularSeries = ref();
const dataTopRated = ref();
const Page = ref(1);
const count = ref(1);
const theSeries = ref(false);
const loadApiPlaying = ref()

export const useSeries = defineStore("useSeries", () => {
  async function getAirToday() {
    loadApiPlaying.value = true;
    await httpMovies
      .get(`/tv/top_rated?language=en-US&page=`)
      .then(({ data }) => {
        loadApiPlaying.value = false
        dataAirToday.value = data.results.filter((item) => {
          if (!item.backdrop_path) return;
          return item;
        });
      });
  }
  async function getOnTheAir() {
    loadApiPlaying.value = true
    const data1 = await httpMovies.get(
      `/tv/top_rated?language=pt-BR&page=${Page.value}`
    );
    const data2 = await httpMovies.get(
      `/tv/popular?language=pt-BR&page=${Page.value}`
    );
    loadApiPlaying.value = false
    const joinArrays = [data1.data.results, data2.data.results];
    dataOnAir.value = joinArrays[0].concat(joinArrays[1]);
  }
  function nextPage() {
    count.value++;
    Page.value++;
    getOnTheAir();
  }
  function backPage() {
    count.value--;
    Page.value--;
    getOnTheAir();
  }
  return {
    getAirToday,
    getOnTheAir,
    backPage,
    nextPage,
    dataAirToday,
    dataOnAir,
    dataPopularSeries,
    dataTopRated,
    count,
    theSeries,
    loadApiPlaying
  };
});
