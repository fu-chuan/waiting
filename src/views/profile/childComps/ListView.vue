<template>
  <div id="list-view">
      <div v-for="item in list" :key="item.index" class="list">
        <span class="list-item">{{ item }}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
#list-view {
    width: 100%;
}
.list {
    height: 44px;
    line-height: 44px;
    margin-left: 20px;
    border-bottom: 1px solid #eee;
}
.list:last-child {
    border-bottom: 0;
}
.list-item {
    font-size: 16px;
    font-family: Arial;
}
</style>