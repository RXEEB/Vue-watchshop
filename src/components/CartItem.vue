<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,

  onClickDelete: Function
})
</script>

<template>
  <div
    class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4 transition hover:-translate-x-0.5 hover:shadow-xl"
  >
    <img :src="imageUrl" class="w-16 h-16" :alt="title" />
    <div class="flex flex-col w-full">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-5">
        <span class="font-bold">{{ price }} руб.</span>
        <img
          @click="emit('onClickRemove')"
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
