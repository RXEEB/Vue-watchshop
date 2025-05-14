<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="flex justify-between border-b border-slate-200 px-10 py-5 sticky top-0 bg-white z-20 rounded-lg"
  >
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-10 h-auto" src="/logo-2.png" alt="logo" />
        <div>
          <h1 class="text-xl font-bold uppercase">Магазин часов</h1>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <span>{{ totalPrice }} руб.</span>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer w-fit">
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
