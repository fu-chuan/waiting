<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 创建BScroll实例对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
// console.log(this.scroll);

    // 监听滚动的设置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    });

    // 监听下拉加载更多的设置
     this.scroll.on('pullingUp', () => {
      //  console.log('day');
      this.$emit('pullingUp')
       
     })
  },
  methods: {
    scrollTo(x, y, time = 300) {
       this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
       this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('------');
       this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
      
      
    }
  }
};
</script>

<style scoped>
</style>