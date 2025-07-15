<script setup>
import { computed, onMounted, ref } from 'vue';
import { getApi } from './api/youbike/youbike.api';
import YoubikeCardItem from '@/components/YoubikeCardItem/index.vue'
import { useYoubikeStore } from './stores/Youbike';

const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
const likeStations = ref([])
const stations = ref([])
const keyword = ref('')
const searchedKeyword = ref('')
const isLoading = ref(false)

const store = useYoubikeStore()
onMounted(async () => {
  store.getLikeStation()
})

const search = async () => {
  if (keyword.value != '') {
    // if (true) {
    isLoading.value = true
    const { data } = await getApi(url)
    console.log(data)
    searchedKeyword.value = keyword.value
    stations.value = data.filter(x => {
      return x.sna.includes(keyword.value)
        || x.snaen.includes(keyword.value)
        || x.ar.includes(keyword.value)
        || x.aren.includes(keyword.value)
    })
    isLoading.value = false
  }
}

const checkKeyword = computed(() => keyword.value != '')
</script>

<template>
  <main style="min-height: 720px">
    <header class="w-full flex justify-center items-center py-6 mb-2">
      <h1
        class="text-4xl font-extrabold tracking-widest text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-xl daisyui-glass rounded-2xl px-8 py-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-400 animate-pulse" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        台北市 Youbike 查詢
      </h1>
    </header>
    <section class="container mx-auto">
      <h1
        class="text-3xl font-bold text-center text-primary mb-4 tracking-wide bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg daisyui-glass rounded-xl py-3">
        <span class="inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-cyan-400 animate-pulse" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          收藏站點：
        </span>
      </h1>
      <p v-if="store.likeStations.length == 0">無</p>
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-2">
        <YoubikeCardItem v-for="likeStation in store.likeStations" :station="likeStation"></YoubikeCardItem>
      </section>
      <div class="my-4 divider divider-accent"></div>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 p-4 rounded-xl daisyui-glass bg-base-200/60 shadow-lg">
        <label for="keyword"
          class="text-lg font-semibold text-cyan-400 tracking-wide mb-2 sm:mb-0 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400 animate-pulse" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          關鍵字：
        </label>
        <input id="keyword" type="text"
          class="input input-bordered input-primary w-full max-w-xs mx-2 focus:ring-2 focus:ring-cyan-400 transition-all"
          title="關鍵字" placeholder="請輸入關鍵字" v-model.trim="keyword" @keyup.enter="search" />
        <button type="button" class="btn btn-primary btn-glass font-bold px-6 py-2 shadow-md" @click="search"
          :disabled="!checkKeyword">
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          <span v-else>查詢</span>
        </button>
      </div>
      <span v-if="searchedKeyword != ''" class="text-base text-cyan-400 font-medium text-center mb-2">
        查詢 "{{ searchedKeyword }}"：
        <div class="badge badge-primary">
          {{ stations.length }}
        </div>
      </span>
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-2">
        <YoubikeCardItem v-for="station in stations" :station="station"></YoubikeCardItem>
      </section>
    </section>
  </main>
  <footer class="text-center font-sm">@2025</footer>
</template>

<style scoped></style>