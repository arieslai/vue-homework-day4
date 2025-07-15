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
  <main class="bg-base-200" style="min-height: 720px">
    <section class="container mx-auto">
      <h1>收藏站點：</h1>
      <p v-if="store.likeStations.length == 0">無</p>
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-2">
        <YoubikeCardItem v-for="likeStation in store.likeStations" :station="likeStation"></YoubikeCardItem>
      </section>
      <div class="my-4 divider"></div>
      關鍵字：<input type="text" class="input mx-2" title="關鍵字" placeholder="請輸入關鍵字" v-model.trim="keyword"
        @keyup.enter="search" />
      <button type="button" class="btn btn-primary" @click="search" :disabled="!checkKeyword">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        查詢
      </button>
      <p v-if="searchedKeyword != ''">"{{ searchedKeyword }}" 結果：</p>
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4 my-2">
        <YoubikeCardItem v-for="station in stations" :station="station"></YoubikeCardItem>
      </section>
    </section>
  </main>
  <footer class="text-center font-sm">@2025</footer>
</template>

<style scoped></style>