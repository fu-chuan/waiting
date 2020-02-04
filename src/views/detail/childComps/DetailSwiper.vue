<template>
  <div id="Detailswiper">
    <swiper class="detail-tiem">
      <swiper-item v-for="item in topImages" :key="item.iid">
        <a :href="item.link">
          <img :src="item" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "Detailswiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
  .detail-tiem {
    height: 300px;
    overflow: hidden;
  }
</style>