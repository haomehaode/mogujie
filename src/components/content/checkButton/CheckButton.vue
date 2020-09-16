<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked:{
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.check-button{
  border-radius: 50%;
  border:2px solid #aaa;
}
.active{
  border-color: rgb(255, 105, 150);
  background-color: rgb(255, 105, 150);
}
</style>
