<template>
  <div class="toast" v-show="isshow">
    <div class="toast-in">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ""
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      message: '',
      isshow: false
    };
  },
  methods: {
    show(message, duration) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
        this.message = '';
      }, duration);
    }
  },
};
</script>

<style scoped>
.toast {
  height: 40px;
  border-radius: 5px;
  line-height: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #eee;
  z-index: 10000;
  font-size: 14px;
  transform: translate(-50%, -50%);
}
.toast-in {
    margin: auto 5px;
}
</style>