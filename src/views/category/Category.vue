<template>
  <div id="category" class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categorys="categorys" @itemClick="itemClick" class="tab-menu"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategories"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabclick"></tab-control>
          <tab-content-detail :category-detail="showCategoryData"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
export default {
  name: "Category",
  data() {
    return {
      categorys: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop"
    };
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    TabContentCategory,
    TabContentDetail,
    TabMenu
  },
  created() {
    this.getCategory();
  },
  computed: {
    showSubcategories() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryData() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    /**
     * 事件方法
     */
    itemClick(index) {
      this.getSubcategory(index);
    },

    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    /**
     * 数据请求
     */
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.categorys = res.data.category.list;
        for (let i = 0; i < this.categorys.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          };
        }
        this.getSubcategory(0);
      });
    },
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categorys[index].maitKey;
      getSubcategory(maitKey).then(res => {
        // console.log(res);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        // console.log(this.categoryData);
        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },
    getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categorys[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>
