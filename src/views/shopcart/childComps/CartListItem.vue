<template>
  <div id="cartListItem">
    <div class="item-selector">
      <check-button :is-checked="item.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="item.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-desc">商品描述: {{ item.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ item.price }}</div>
        <div class="item-count right">x{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: "CartListItem",
  props:{
    item:{
      type:Object,
      default(){
        return [];
      }
    }
  },
  components:{
    CheckButton
  },
  methods:{
    checkClick(){
      this.item.checked=!this.item.checked
    }
  }
};
</script>
<style scoped>

.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}

.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666666;
}

.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}

.info-bottom .item-price {
  color: #ff4500;
}
</style>
