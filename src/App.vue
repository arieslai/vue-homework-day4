<script setup>
import { computed, onMounted, ref } from 'vue'
import { getApi } from './api/youbike/youbike.api'
import YoubikeCardItem from '@/components/YoubikeCardItem/index.vue'
import { useYoubikeStore } from './stores/Youbike'

const THEME_STORAGE_KEY = 'auo-youbike-theme'
const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
const stations = ref([])
const keyword = ref('')
const searchedKeyword = ref('')
const isLoading = ref(false)
const theme = ref('dark')

const store = useYoubikeStore()

const isDarkTheme = computed(() => theme.value === 'dark')
const themeButtonLabel = computed(() => (isDarkTheme.value ? '切換淺色主題' : '切換深色主題'))
const checkKeyword = computed(() => keyword.value !== '')

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

const applyTheme = (nextTheme) => {
  theme.value = nextTheme
  document.documentElement.setAttribute('data-theme', nextTheme)

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  } catch {
    // Ignore storage failures and still apply the theme for the current session.
  }
}

const initializeTheme = () => {
  const savedTheme = getStoredTheme()
  const htmlTheme = document.documentElement.getAttribute('data-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme)
    return
  }

  applyTheme(htmlTheme === 'light' ? 'light' : 'dark')
}

const toggleTheme = () => {
  applyTheme(isDarkTheme.value ? 'light' : 'dark')
}

onMounted(() => {
  store.getLikeStation()
  initializeTheme()
})

const search = async () => {
  if (keyword.value !== '') {
    isLoading.value = true
    const { data } = await getApi(url)
    searchedKeyword.value = keyword.value
    stations.value = data.filter((station) => {
      return (
        station.sna.includes(keyword.value) ||
        station.snaen.includes(keyword.value) ||
        station.ar.includes(keyword.value) ||
        station.aren.includes(keyword.value)
      )
    })
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-[720px]">
    <header class="mb-2 flex flex-col items-center gap-4 py-6">
      <div class="flex w-full max-w-6xl justify-end">
        <button
          type="button"
          class="btn btn-sm gap-2 rounded-full border border-base-300 bg-base-100 text-base-content shadow-md sm:btn-md"
          :aria-label="themeButtonLabel"
          @click="toggleTheme"
        >
          <svg
            v-if="isDarkTheme"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M12 3v2.25m0 13.5V21m9-9h-2.25M5.25 12H3m15.114 6.364-1.59-1.591M7.476 7.476 5.886 5.886m12.228 0-1.59 1.59M7.476 16.524l-1.59 1.59M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 12.79A9 9 0 1111.21 3c-.144.664-.22 1.352-.22 2.058A9 9 0 0020.942 15c0 .751-.079 1.484-.232 2.21Z"
            />
          </svg>
          <span>{{ themeButtonLabel }}</span>
        </button>
      </div>
      <h1
        class="flex items-center gap-3 rounded-2xl px-8 py-4 text-center text-4xl font-extrabold tracking-widest"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 animate-pulse text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <span
          class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
        >
          台北市 Youbike 查詢
        </span>
      </h1>
    </header>
    <section class="mx-auto max-w-6xl">
      <h2
        class="mb-4 flex items-center justify-center gap-2 rounded-xl py-3 text-center text-3xl font-bold tracking-wide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 animate-pulse text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span
          class="bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent"
        >
          收藏站點：
        </span>
      </h2>
      <p v-if="store.likeStations.length === 0" class="text-center text-base-content opacity-70">
        無
      </p>
      <section class="my-2 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <YoubikeCardItem
          v-for="likeStation in store.likeStations"
          :key="likeStation.sno"
          :station="likeStation"
        />
      </section>
      <div class="divider divider-accent my-4"></div>
      <div
        class="mb-4 flex flex-col items-center justify-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-lg sm:flex-row"
      >
        <label
          for="keyword"
          class="mb-2 flex items-center gap-2 text-lg font-semibold tracking-wide text-cyan-500 sm:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 animate-pulse text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          關鍵字：
        </label>
        <input
          id="keyword"
          v-model.trim="keyword"
          type="text"
          class="input input-bordered input-primary mx-2 w-full max-w-xs transition-all focus:ring-2 focus:ring-cyan-400"
          title="關鍵字"
          placeholder="請輸入關鍵字"
          @keyup.enter="search"
        />
        <button
          type="button"
          class="btn btn-primary px-6 py-2 font-bold shadow-md"
          @click="search"
          :disabled="!checkKeyword"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          <span v-else>查詢</span>
        </button>
      </div>
      <div
        v-if="searchedKeyword !== ''"
        class="mb-2 flex items-center justify-center gap-2 text-center text-base font-medium text-cyan-500"
      >
        <span>查詢 "{{ searchedKeyword }}"：</span>
        <div class="badge badge-primary">
          {{ stations.length }}
        </div>
      </div>
      <section class="my-2 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <YoubikeCardItem v-for="station in stations" :key="station.sno" :station="station" />
      </section>
    </section>
  </main>
  <footer class="pt-4 text-center text-sm text-base-content opacity-60">@2025</footer>
</template>

<style scoped></style>
