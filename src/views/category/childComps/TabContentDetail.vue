<template>
  <grid-view class="item">
      <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item" class="goods"></goods-list-item>
  </grid-view>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";
import GridView from "components/common/gridview/GridView";
export default {
  name: "TabContentDetail",
  props: {
    categoryDetail: {
      type: Array,
      default: []
    }
  },
  components: {
    GoodsListItem,
    GridView
  }
};
</script>

<style scoped>

</style>