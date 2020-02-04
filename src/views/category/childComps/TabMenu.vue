<template>
  <scroll id="tab-menu">
    <div class="menu-item">
      <div
        class="menu-list-item"
        v-for="(item, index) in categorys"
        :key="index"
        @click="itemClick(index)"
        :class="{active: currentIndex === index}"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categorys: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    }
  }
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  float: left;
  margin: 0;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.active {
  background-color: #fff;
  font-weight: 700;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);
}
</style>