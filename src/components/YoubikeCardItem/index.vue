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
  <div class="select-none card bg-base-100 card-md shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{{ station.sna }}</h2>
      <p>{{ station.ar }}</p>
      <div class="justify-end card-actions">
        <button @click="onShowDetailModal" class="btn btn-sm btn-info">詳細</button>
        <button v-if="!hasLikeStation()" @click="onAddLikeStation(station)" class="btn btn-sm btn-warning">收藏</button>
        <button v-if="hasLikeStation()" @click="onRemoveLikeStation(station)" class="btn btn-sm btn-error">取消收藏</button>
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