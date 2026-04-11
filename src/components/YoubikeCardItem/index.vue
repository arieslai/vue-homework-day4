<script setup>
import { useYoubikeStore } from '@/stores/Youbike'
import { ref, useTemplateRef } from 'vue'

const props = defineProps({
  station: Object,
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

const hasLikeStation = () => {
  return store.hasLikeStation(props.station)
}

const detailModal = useTemplateRef('detail-modal')

const info = ref({
  sna: '站名',
  snaen: '英文站名',
  ar: '地址',
  aren: '英文地址',
  available_rent_bikes: '可租借車輛數',
  available_return_bikes: '可停放車輛數',
})
</script>

<template>
  <div
    class="card card-md select-none border border-base-300 bg-base-100 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
  >
    <div class="card-body">
      <h2
        class="card-title flex items-center gap-3 text-lg font-bold tracking-wide text-base-content"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full bg-base-200 text-primary shadow-sm ring-1 ring-base-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        </span>
        <span>{{ station.sna }}</span>
      </h2>
      <p class="mb-2 text-sm text-base-content opacity-70">{{ station.ar }}</p>
      <div class="card-actions justify-end gap-2">
        <button @click="onShowDetailModal" class="btn btn-sm btn-outline btn-info">詳細</button>
        <button
          v-if="!hasLikeStation()"
          @click="onAddLikeStation(station)"
          class="btn btn-sm btn-outline btn-warning"
        >
          收藏
        </button>
        <button
          v-if="hasLikeStation()"
          @click="onRemoveLikeStation(station)"
          class="btn btn-sm btn-outline btn-error"
        >
          取消收藏
        </button>
      </div>
    </div>
  </div>

  <dialog ref="detail-modal" class="modal">
    <div class="modal-box border border-base-300 bg-base-100 shadow-2xl">
      <h3 class="text-lg font-bold">詳細</h3>
      <div class="flex gap-2">
        <ol>
          <li v-for="key in Object.keys(info)" :key="key">{{ `${info[key]}：${station[key]}` }}</li>
        </ol>
      </div>
      <div class="card-actions justify-end">
        <button @click="onCloseDetailModal" class="btn">取消</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
