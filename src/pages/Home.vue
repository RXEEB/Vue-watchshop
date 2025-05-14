<script setup>
import axios from 'axios'
import { inject, provide, reactive, ref, watch, onMounted } from 'vue'

import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddplus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://68fc0d0d7033dcc1.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      try {
        await axios.delete(`https://68fc0d0d7033dcc1.mokky.dev/favorites/${item.favoriteId}`)
        item.isFavorite = false
        item.favorite = null
      } catch (error) {
        alert('error deleting favorites on the server ')
      }
    }
  } catch (error) {
    alert('error adding favorites on the server')
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://68fc0d0d7033dcc1.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    alert('error getFavorites ')
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://68fc0d0d7033dcc1.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) =>
      reactive({
        ...obj,
        isFavorite: false,
        favorite: null,
        isAdded: false
      })
    )
  } catch (error) {
    alert('error server')
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(
  cart,
  (newCart) => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: newCart.some((cartItem) => cartItem.id === item.id)
    }))
  },
  { deep: true }
)
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

watch(filters, fetchItems, { deep: true })
</script>



<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl mb-8 font-bold">Все модели</h2>
    <div class="flex gap-4">
      <select v-model="filters.sortBy" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (↓)</option>
        <option value="-price">По цене (↑)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
        <input
          v-model="filters.searchQuery"
          class="border rounded-md py-2 px-3 pl-11 pr-4 outline-none focus: border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @add-to-Favorite="addToFavorite" @add-to-cart="onClickAddplus" />
</template>
