<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list :cart-list="cartList"></cart-list>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  

  import CartList from './childComps/CartList';

  import {mapGetters} from 'vuex';
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength'])
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }

</style>
