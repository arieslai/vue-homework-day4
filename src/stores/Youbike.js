import { defineStore } from 'pinia'
import { ref } from 'vue'

const AUO_YOUBIKE_STORAGE_KEY = 'auo-youbike'
const useYoubikeStore = defineStore('youbike', () => {
  const likeStations = ref([])

  const addLikeStation = (station) => {
    console.log('addLikeStation', station)
    if (!hasLikeStation(station))
      likeStations.value.unshift(station);
    localStorage.setItem(AUO_YOUBIKE_STORAGE_KEY, JSON.stringify(likeStations.value))
  }

  const removeLikeStation = (station) => {
    const index = likeStations.value.find((s) => s.sno == station.sno)
    likeStations.value.splice(index, 1)
    localStorage.setItem(AUO_YOUBIKE_STORAGE_KEY, JSON.stringify(likeStations.value))
  }

  const getLikeStation = () => {
    const str = localStorage.getItem(AUO_YOUBIKE_STORAGE_KEY);
    likeStations.value = str == null ? [] : JSON.parse(str)
    console.log(likeStations.value)
  }

  const hasLikeStation = (station) => {
    return (likeStations.value.find((likeStation) => likeStation.sno == station.sno)) != null
  }

  return { likeStations, addLikeStation, removeLikeStation, getLikeStation, hasLikeStation }
})

export { useYoubikeStore }