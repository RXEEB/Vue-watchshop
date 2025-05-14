<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-solid border-[#c9ced6] rounded-3xl p-8 cursor-pointer transition hover:transform hover:-translate-y-2 hover:border-transparent shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:border-none flex flex-col h-full"
  >
    <img
      class="absolute top-5 left-8 rounded-md"
      :src="!isFavorite ? 'Favorite.svg' : 'FavoriteFilled.svg'"
      alt="like"
      @click="onClickFavorite"
    />
    <img class="w-64 h-auto mx-auto" :src="imageUrl" alt="" />
    <div class="flex flex-col justify-between flex-grow mt-4">
      <p class="font-medium line-clamp-2 min-h-[40px]">{{ title }}</p>
      <div class="flex justify-between mt-5">
        <div class="flex items-center gap-2">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>
        <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : 'checked.svg'" alt="plus" />
      </div>
    </div>
  </div>
</template>
