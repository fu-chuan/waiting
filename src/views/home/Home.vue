<template>
  <div id="home" class="wrapper" @mousewheel.prevent>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control :titles="['流行', '新款', '精选']" class="fiexd" 
      @tabClick="tabclick" ref="tabControl1" v-show="tabFiexd"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="conterScroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control"
      @tabClick="tabclick" ref="tabControl2"/>
      <goods-list :goods-list="show" />
    </scroll>
    <back-top @click.native="backclick" v-show="flag"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/debounce";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      flag: false,
      tabOffsetTop: 0,
      tabFiexd: false,
      saveY: 0,
      itemImageList: null
    };
  },
  computed: {
    show() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata();
    // 请求商品展示的数据
    this.getHomeGoods("pop");

    this.getHomeGoods("new");

    this.getHomeGoods("sell");
  },
  mounted() {
    let scroll = debounce( this.$refs.scroll.refresh, 50)

    this.itemImageList =  () => {
      // 使用事件总线接受 goodsListItem传递过来的事件
      // this.$refs.scroll.refresh();
      scroll()
    }
    // 放在mounted中调用 防止bug
    this.$bus.$on("itemImageLoad", this.itemImageList);
  },
  activated(){
    this.$refs.scroll.scrollTo(0 ,this.saveY);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY);
    
    // 取消全局事件（图片加载）的监听
    this.$bus.$off("itemImageLoad", this.itemImageList)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backclick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500) 这样写两个scroll容易看混淆
      this.$refs.scroll.scrollTo(0, 0);
    },
    conterScroll(position) {
      this.flag = -position.y > 1000;
      this.tabFiexd = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('答应更多');
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(res.data.list);
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.wrapper {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.tab-control {
  position: sticky; 
  bottom: -15px;
}
.fiexd {
  position: relative;
  top: 0;
  z-index: 999;
}
/* .coontent {
  height: calc(100% - 93px) !important;
   overflow: hidden;
  margin-top: 44px;
} */
.coontent {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .fiexd {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 44px;

} */
</style>
