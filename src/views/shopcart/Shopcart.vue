<template>
  <div class="shopcart">
    <!-- 导航 -->
    <nav-bar class="shopcart-nav">
      <div slot="center">购物车(<span>{{ cartLength }}</span>)</div>
    </nav-bar>
    <!-- 购物车列表 -->
    <cart-list />
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from "vuex";
export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 将vuex中的Getter引入
    ...mapGetters({
      cartLength: "cartListLength"
    })
  },
}
</script>

<style scoped>
.shopcart-nav {
  background-color: rgb(255, 105, 150);
  color: #fff;
}
</style>
