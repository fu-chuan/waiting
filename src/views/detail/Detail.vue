<template>
  <div id="Detail" class="wrapper">
    <detail-item @titleCilck="titleCilck" :current-index="currentIndex" ref="nav"></detail-item>
    <scroll class="center" ref="scroll" @scroll="conterScroll" :pull-up-load="true" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-views :goods-data="goodsData"></detail-views>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods-list="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="flag"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show">{{message}}</toast>
  </div>
</template>

<script>
import DetailItem from "./childComps/DetailItem";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailViews from "./childComps/DetailViews";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import Toast from 'components/common/toast/Toast';

import { debounce } from "common/debounce";

import {
  getDetail,
  GoodsData,
  Shop,
  ItemParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsData: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImageList: null,
      flag: false,
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      show: false
    };
  },
  components: {
    DetailItem,
    DetailSwiper,
    DetailViews,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,
    Scroll,
    Toast
  },
  created() {
    this.iid = this.$route.query.iid;
    // this.iid = this.$route.params.iid;
    this.getDetail();
    this.getRecommend();
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
      console.log(this.themeTopY);
    }, 100);
  },
  mounted() {
    let scroll = debounce(this.$refs.scroll.refresh, 50);

    this.itemImageList = () => {
      // 使用事件总线接受 goodsListItem传递过来的事件
      // this.$refs.scroll.refresh();
      scroll();
    };
    // 放在mounted中调用 防止bug
    this.$bus.$on("itemImageLoad", this.itemImageList);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageList);
  },
  methods: {
    // 获取详情数据
    getDetail() {
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        // 轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 商品数据
        this.goodsData = new GoodsData(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 店铺信息数据
        this.shop = new Shop(data.shopInfo);
        //商品详情信息
        this.detailInfo = data.detailInfo;
        // 参数数据
        this.paramInfo = new ItemParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    // 获取推荐数据
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.list;
      });
    },

    imagesLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },

    titleCilck(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },

    backclick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500) 这样写两个scroll容易看混淆
      this.$refs.scroll.scrollTo(0, 0);
    },
    conterScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopY.length;

      this.flag = positionY > 1000;
      // console.log(position);

      for (let i = 0; i < length; i++) {
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopY[i] &&
        //     positionY < this.themeTopY[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopY[i]))
        // ) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        // hack 做法 解决nav和内容滚动同步  这样做提高性能
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      const obj = {};
      obj.iid = this.iid;
      obj.img = this.topImages[0];
      obj.desc = this.goodsData.desc;
      obj.title = this.goodsData.title;
      obj.price = this.goodsData.realPrice;

      this.$store.dispatch('addCart', obj).then(res => {
      //   this.show = true;
      //   this.message = res;
      //   console.log(res);
        
      //  setTimeout(() => {
      //    this.show = false;
      //    this.message = '';
      //  }, 1500);
      
      this.$toast.show(res, 2000)
      })
    }
  }
};
</script>

<style scoped>
#Detail {
  position: relative;
  z-index: 9999;
  background-color: #fff;
}
.wrapper {
  height: 100vh;
  overflow: hidden;
}
.center {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>