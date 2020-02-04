<template>
  <div class="check-button" :class="{check: ischeck}" >
    <img src="~assets/img/cart/tick.svg"/>
  </div>
</template>

<script>
export default {
  name: "CartButton",
  props: {
    ischeck: {
      type: Boolean,
      default: false
    }
  },

};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #aaa;
}
.check {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>