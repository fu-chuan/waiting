<template>
  <div class="button-item">
    <cart-button class="button-conter" @click.native="buttonClick" :ischeck="isSelectAll"></cart-button>
    <span>全选</span>
    <span class="total-price">合计: {{totalPrice}}</span>
    <span class="buy-product">去计算({{checkListLength}})</span>
  </div>
</template>

<script>
import CartButton from "./CartButton";
export default {
  name: "Buttonbar",
  components: {
    CartButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((total, value) => {
            return total + value.price * value.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkListLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
        // 判断勾选框是否全选 没有数据 取false 全选框不全选
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
     buttonClick() {
         if (this.isSelectAll) {
             this.$store.state.cartList.forEach(item => {
                 return item.checked = false
             });
         }else {
             this.$store.state.cartList.forEach(item => {
                 return item.checked = true
             });
         }
     } 
  },
};
</script>

<style scoped>
.button-item {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 48px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.button-conter {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.button-item span {
  margin-left: 2px;
}
.button-item .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.button-item .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>