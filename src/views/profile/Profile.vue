<template>
  <div id="Profile">
    <div class="nav-bar">
      <div class="nav-on">
        <img src="~assets/img/common/timg.png" alt />
      </div>
      <div class="nav-center">
        <span class="center-l">登录/注册</span>
        <span class="center-r">暂无绑定手机号</span>
      </div>
      <span class="nav-right"> ></span>
    </div>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view :list="islist"></list-view>
    <list-view :list="boedrlist" class="list-item"></list-view>
  </div>
</template>

<script>
import ListView from './childComps/ListView'
export default {
  name: "Profile",
  components: {
    ListView
  },
  data() {
    return {
      islist: ['我的消息', '积分商城', '会员卡'],
      boedrlist: ['我的购物车', '下载app']
    }
  },
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 90px;
  background-color: var(--color-tint);
}
.nav-bar .nav-on {
  float: left;
  width: 60px;
  height: 60px;
  border: 2px solid #eee;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  margin: 15px;
}
.nav-on img {
  width: 100%;
  height: 100%;
}
.nav-center {
  float: left;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 24px 0 24px 5px;
  color: #fff;
}
.center-l {
  flex: 1;
  font-size: 20px;
  margin-bottom: 5px;
}
.center-r {
  font-size: 14px;
  margin: 0 2px;
}
.nav-right{
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  float: right;
  margin-top: 35px;
  margin-right: 20px;
}
.account {
    display: flex;
    width: 100%;
    border-bottom: 20px solid #eee;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
    border-right: 1px solid #eee;
  }

  .account-item:nth-child(3) {
    border-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
  .list-item {
    margin-top: 20px;
    border-top: 20px solid #eee;
  }
</style>
