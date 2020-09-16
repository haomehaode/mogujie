<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleItemClick="titleItemClick" ref="detailNavBar"  />
    <scroll class="content" :probe-type="3"  @positionScroll="contentScroll" :pull-up-load="true" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
      <detail-param-info :param-info="paramsInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommendList" ref="recommend"/>
    </scroll>
    <!-- 原生组件监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNvaBar";
import DetailSwiper from "./childComps/DatailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImagesInfo from "./childComps/DetailImagesInfo";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";

import { getDetail, Goods, Shop, ParamsInfo, getRecommend } from "network/detail";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    Scroll,
    BackTop,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailsInfo: {},
      paramsInfo:{},
      commentInfo:{},
      recommendList:[],
      isShowBackTop: false,
      itemImgListener:null,
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    console.log(this.iid);

    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺数据
      this.shops = new Shop(data.shopInfo);
      // 获取下面的图片展示数据
      this.detailsInfo = data.detailInfo;
      // 获取尺寸数据
      this.paramsInfo = new ParamsInfo(
        data.itemParams.info,
        data.itemParams.rule || {}
      );
      // 获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
    });
    getRecommend().then(res=>{
      console.log(res);
      this.recommendList = res.data.list;
    });
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    },100);
  },
  destroyed() {
    console.log("Detail页面销毁");
  },
  activated() {
    //进来
    console.log("Detail页面进来");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //离开
    console.log("Detail页面离开");
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener=() => {
      console.log("图片加载完成Detail");
      refresh(); 
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    backClick() {
      console.log("Detail回到顶部");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      const positionY=-position.y;
      let length=this.themeTopYs.length;
      for(let i=0;i<length-1;i++){
        if(this.currentIndex!=i&&(positionY>=this.themeTopYs[i]&&positionY<=this.themeTopYs[i+1])){
          this.currentIndex=i;
          this.$refs.detailNavBar.currentIndex=this.currentIndex;
          console.log(this.currentIndex);
        }
      }
    },
    titleItemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
    },
    addCart(){
      console.log('添加商品'+this.iid)
       // 1.获取需要展示到购物车的商品信息
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        iid: this.iid
      };
      console.log(obj);
      // 2.将商品数据传到购物车页面
      this.$store.dispatch('addCart', obj);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>
