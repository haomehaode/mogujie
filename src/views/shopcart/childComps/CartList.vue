<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item class="shop-item"  v-for="(item, index) in cartList" :key="index" :item="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem'
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 刷新better-scroll
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}

.shop-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
}


</style>
