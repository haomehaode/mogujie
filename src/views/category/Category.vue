<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClick="slideBarItemClick" />
    <scroll class="content" @pullingUp="loadMore" ref="scroll">
      <subcategory :category-list="subcategoryList" />
      <tab-control :titles="titleList" @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="categoryDetailList" />
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import SlideBar from './childComps/SlideBar'
import Subcategory from './childComps/SubCategory'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getCategory, getCategoryDetail, getSubcategory } from 'network/category'
import { debounce } from 'common/utils'
export default {
  name: 'Category',
  data() {
     return {
      // 分类内容数据
      subcategoryList: [],
      categoryDetailList: [],
      // 分类侧边栏数据
      categoryList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0
    };
  },
  components: {
    NavBar,
    SlideBar,
    Subcategory,
    TabControl,
    GoodsList,
    Scroll
  },
  created(){
    this.getCategory();
  },
  destroyed() {
    console.log("页面销毁");
  },
  activated() {
    //进来
    console.log("Category页面进来");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //离开
    console.log("Category页面离开");
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener=() => {
      //console.log("图片加载完成Home");
      refresh(); /*   this.$refs.scroll.refresh(); */
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    //获取他把control的offsetTop
    //所有的组件都有一个属性$el；用于获取组件中的元素
    //this.tabOffsetTop=this.$refs.tabControl.$el
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        console.log(res.data.category.list);
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        });
      });
    },
    getSubcategory(key) {
      getSubcategory(key).then(res => {
        console.log(res.data.list);
        this.subcategoryList = [...res.data.list];
      });
    },
    getCategoryDetail(key, type) {
      getCategoryDetail(key, type).then(res => {
        console.log(res);
        this.categoryDetailList = [...res];
      });
    },
    slideBarItemClick({ maitKey, index }) {
      console.log(maitKey+'----------'+index)
      // 防止反复请求
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.currentIndex = 0;
      // 请求对应的推荐列表
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
      this.getSubcategory(maitKey);
      this.$refs.scroll.scrollTo(0, 0);
    },
    loadMore() {
      // console.log("上拉加载更多");
      // const typeList = ["pop", "new", "sell"];
      // this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[currentIndex]);
    },
    tabClick(index) {
      const typeList = ["pop", "new", "sell"];
      this.currentIndex=index
      // 切换类型数据
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
    }
  }
}
</script>

<style scoped>
.category-nav {
  background-color: rgb(255, 105, 150);
  color: #fff;
}
.content {
  /* 设置scoll高度  height：300px  才可以滚动 */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 100px;
  right: 0;
}

</style>
