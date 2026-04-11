<script setup>
import { useYoubikeStore } from '@/stores/Youbike'
import { computed, ref, useTemplateRef } from 'vue'

const props = defineProps({
  station: Object
})

const store = useYoubikeStore()
const onAddLikeStation = (station) => {
  store.addLikeStation(station)
}

const onRemoveLikeStation = (station) => {
  store.removeLikeStation(station)
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
  'sna': '站名',
  'snaen': '英文站名',
  'ar': '地址',
  'aren': '英文地址',
  'available_rent_bikes': '可租借車輛數',
  'available_return_bikes': '可停放車輛數',
})

const rentBadgeClass = computed(() => {
  const n = props.station.available_rent_bikes
  if (n >= 5) return 'badge-success'
  if (n >= 1) return 'badge-warning'
  return 'badge-error'
})

const returnBadgeClass = computed(() => {
  const n = props.station.available_return_bikes
  if (n >= 5) return 'badge-success'
  if (n >= 1) return 'badge-warning'
  return 'badge-error'
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
      <p class="text-xs text-cyan-200 mb-1">{{ station.ar }}</p>
      <div class="flex gap-3 text-xs mb-2">
        <span class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-cyan-300">可借</span>
          <span :class="['badge badge-sm font-bold', rentBadgeClass]">
            {{ station.available_rent_bikes }}
          </span>
        </span>
        <span class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span class="text-cyan-300">可還</span>
          <span :class="['badge badge-sm font-bold', returnBadgeClass]">
            {{ station.available_return_bikes }}
          </span>
        </span>
      </div>
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
