<template>
  <div class="profile-list">
    <div class="profile-list-item">
      <img src="~assets/img/profile/message.svg"/>
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <img src="~assets/img/profile/pointer.svg"/>
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <img src="~assets/img/profile/vip.svg"/>
      <span style="border-bottom: 0;">会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item">
      <img src="~assets/img/profile/cart.svg"/>
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
      <img src="~assets/img/profile/shopping.svg"/>
      <span>我的工具</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileList"
};
</script>

<style scoped>
.profile-list {
  width: 100%;
}

.profile-list-item {
  line-height: 45px;
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 20px;
}

.profile-list-item img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.profile-list-item span {
  font-size: 16px;
  display: inline-block;
  width: 100%;
  color: #333333;
  border-bottom: 1px solid #dddddd;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>
