<template>
  <div class="slide-bar">
  <div class="slide-inner">
    <button class="slide-bar-item" v-for="(item, index) in slideBarList"  :key="index" 
      :class="currentIndex === index ? 'active' : ''" 
      @click="slideBarItemClick(item, index)" >
      {{ item.title }}
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    slideBarList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    slideBarItemClick(item, index) {
      const obj = {
        maitKey: item.maitKey,
        index,
      };
      this.currentIndex = index;
      this.$emit("slideBarItemClick", obj);
    },
  },
};
</script>

<style scoped>
.slide-bar {
  position: fixed;
  width: 100px;
  background-color: #f6f6f6;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
.slide-inner{
  height: 100%;
  width: 110px;
  overflow-y: scroll;
}

.slide-bar-item {
  font-size: 14px;
  line-height: 45px;
  width: 100px;
  height: 45px;
  user-select: none;
  text-align: center;
  color: #666666;
  border: 0;
  outline: none;
  background: none;
}
 .active {
  font-weight: 700;
  color: rgb(255, 105, 150);
  border-left: 3px solid rgb(255, 105, 150);
  background-color: #ffffff;
}
</style>
