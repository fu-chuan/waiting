<template>
  <div id="cart-list" class="wrapper">
    <Scroll class="content">
      <cart-list-item v-for="item in cartList" :key="item.iid" :info-item="item"></cart-list-item>
    </Scroll>
    <button-bar></button-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";
import ButtonBar from './ButtonBar'

export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem,
    ButtonBar
  },
//   props: {
//     cartList: {
//       type: Array,
//       default() {
//         return [];
//       }
//     }
//   }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
</style>