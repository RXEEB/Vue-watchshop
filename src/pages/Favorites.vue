<script setup>
import { onMounted, ref, inject } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'
import EmptyCart from '@/components/EmptyCart.vue'

// defineProps({
//   title: String,
//   description: String,
//   imageUrl: String
// })

const { cart, addToCart, removeFromCart } = inject('cart')

const favorites = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get('https://68fc0d0d7033dcc1.mokky.dev/favorites')
    favorites.value = data.map((obj) => ({
      ...obj.item,
      favoriteId: obj.id
    }))
  } catch (error) {
    console.error('Error loading favorites:', error)
    alert('Error loading favorites page')
  }
}
onMounted(fetchFavorites)

const removeFavorite = async (item) => {
  try {
    console.log(item)
    await axios.delete(`https://68fc0d0d7033dcc1.mokky.dev/favorites/${item.favoriteId}`)
    fetchFavorites()
  } catch (error) {
    alert('error deleting favorites on the server ')
  }
}

const onClickAddplus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-3xl mb-8 font-bold">Избранное</h2>
    </div>

    <EmptyCart
      v-if="!favorites.length"
      title="В избранном пусто"
      description="Добавляйте товары в избранное, чтобы не потерять их"
      image-url="/package-icon.png"
    />

    <CardList :items="favorites" @add-to-Favorite="removeFavorite" @add-to-cart="onClickAddplus" />
  </div>
</template>
