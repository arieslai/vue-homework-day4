<script setup>
import { useYoubikeStore } from '@/stores/Youbike'
import { ref, useTemplateRef } from 'vue'

const props = defineProps({
  station: Object
})

const store = useYoubikeStore()
const onAddLikeStation = (station) => {
  store.addLikeStation(station)
}

const onRemoveLikeStation = (station) => {
  store.removeLikeStation(station)
  console.log(store.likeStations)
}

const onShowDetailModal = () => {
  detailModal.value.showModal()
}

const onCloseDetailModal = () => {
  detailModal.value.close()
}

const hasLikeStation = () => { return store.hasLikeStation(props.station) }

const detailModal = useTemplateRef("detail-modal")

const info = ref({
  'sna': '中文站名',
  'snaen': '站名',
  'ar': '地址',
  'aren': '英文地址',
  'available_rent_bikes': '可租借車輛數',
  'available_return_bikes': '可停放車輛數',
})

</script>
<template>
  <div
    class="select-none card card-md shadow-xl bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-900 border border-cyan-500/30 hover:scale-105 transition-transform duration-200">
    <div class="card-body">
      <h2 class="card-title text-cyan-300 font-bold tracking-wide text-lg flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-400 animate-pulse" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ station.sna }}
      </h2>
      <p class="text-xs text-cyan-200 mb-2">{{ station.ar }}</p>
      <div class="justify-end card-actions gap-2">
        <button @click="onShowDetailModal" class="btn btn-sm btn-info btn-glass shadow-md">詳細</button>
        <button v-if="!hasLikeStation()" @click="onAddLikeStation(station)"
          class="btn btn-sm btn-warning btn-glass shadow-md">收藏</button>
        <button v-if="hasLikeStation()" @click="onRemoveLikeStation(station)"
          class="btn btn-sm btn-error btn-glass shadow-md">取消收藏</button>
      </div>
    </div>
  </div>

  <dialog ref="detail-modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">詳細</h3>
      <div class="flex gap-2">
        <ol>
          <li v-for="key in Object.keys(info)">{{ `${info[key]}：${station[key]}` }}</li>
        </ol>
      </div>
      <div class="card-actions justify-end">
        <button @click="onCloseDetailModal" class="btn">取消</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>