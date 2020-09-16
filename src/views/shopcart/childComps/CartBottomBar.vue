<template>
  <div class="bottom-bar">
    <div class="cart-check-button">
      <check-button  class="check-button" :is-checked="isSelectAll" @click.native="AllCheck"/>
      <span >全选</span>
    </div>
    <div class="cart-bottom-price">
      合计：
      <span>¥ {{ totalPrice }}</span>
      元
    </div>
    <div class="cart-bottom-btn">
      <button @click="onSubmit">提交订单({{ checkedLength }})</button>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed:{
    ...mapGetters(["cartList", "cartListLength"]),
    // 购物车总价
    totalPrice() {
      return this.cartList
        .filter(item => item.checked)
        .reduce((prev, item) => prev + item.price * item.count, 0)
        .toFixed(2);
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length;
      //return this.$store.state.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length===0) return false
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  },
  methods:{
    AllCheck(){
      console.log('全选')
      if(this.isSelectAll){//全部选择
        this.cartList.forEach(item=>item.checked=false)
      }else{//部分选择
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    onSubmit(){
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  font-size: 15px;
  position: fixed;
  bottom: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}
.cart-check-button{
  display: flex;
}
.check-button{
  height: 20px;
  width:20px;
}
.cart-check-button span{
  margin-top: 1px;
  margin-left: 8px;
}
.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

</style>
