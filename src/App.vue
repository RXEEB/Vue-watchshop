<script setup>
import { provide, ref, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'

import Drawer from './components/Drawer.vue'

/* корзина (start)*/
const cart = ref([])
const drawerOpen = ref(false)
const isCreatingOrder = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value = [...cart.value, item]
  item.isAdded = true
}
// const removeFromCart = (item) => {
//   cart.value.splice(cart.value.indexOf(item), 1)
//   item.isAdded = false
//   console.log(cart.value)
// }

const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://68fc0d0d7033dcc1.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (error) {
    alert('error order')
  } finally {
    isCreatingOrder.value = false
  }
}
/* корзина (end)*/

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>




<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />
  <Header
    class="bg-white w-4/5 m-auto rounded-xl shadow-s"
    @open-drawer="openDrawer"
    :total-price="totalPrice"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-5">
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
