<script setup>
import Card from './Card.vue'
import { defineProps } from 'vue'

defineProps({
  items: Array
})
const emit = defineEmits(['addToFavorite', 'addToCart'])

const onClickAdd = () => {}
</script>


<template>
  <div class="grid grid-cols-5 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :key="item.id"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>
