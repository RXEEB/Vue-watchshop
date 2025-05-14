<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex items-center gap-5 mb-5">
    <svg
      @click="closeDrawer"
      class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:translate-x-1"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 1200 1200"
    >
      <path fill="currentColor" d="M1200 600L496.875 131.25v252.539H0v432.422h496.875v252.539z" />
    </svg>
    <p class="text-2xl font-bold">Корзина</p>
  </div>
</template>
