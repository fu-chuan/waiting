<template>
  <div id="DetailItem">
    <nav-bar>
      <div slot="left" class="left-img" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="center-item">
        <div
          v-for="(item, index) in titles"
          :key="item.index"
          class="center-item-in"
          :class="{active: index=== currentIndex}"
          @click="titleClick(index)"
        >{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailItem",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      
      this.$emit('titleCilck', index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.center-item {
  display: flex;
  font-size: 14px;
}
.center-item-in {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.left-img {
  margin-top: 5px;
}
</style>