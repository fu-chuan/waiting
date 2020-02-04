<template>
  <div id="tab-content-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
       <div class="item" v-for="item in subcategories.list" :key="item.index">
            <a :href="item.link">
               <img class="item-img" :src="item.image" alt=""> 
               <div class="item-text">{{ item.title }}</div>
            </a>  
        </div> 
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridview/GridView";
export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object
    }
  }
};
</script>

<style scoped>
#tab-content-category {
    width: 100%;

}
.item {
    text-align: center;
    font-size: 12px;
  }

.item-img {
    width: 60%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>