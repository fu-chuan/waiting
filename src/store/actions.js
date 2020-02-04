export default {
    addCart(context, payload) {
      // 查找之前数组中是否有该商品
      // console.log(payload);
      return new Promise((resolve, reject) => {
        let oldPayload = context.state.cartList.find(
          item => item.iid === payload.iid
        );
        // 判断oldPayload
        if (oldPayload) {
          // oldPayload.count += 1;
          context.commit('addCounter', oldPayload);
          resolve('当前商品数量+1')
        } else {
          payload.count = 1;
          // context.state.cartList.push(payload);
          context.commit('addToCart', payload);
          resolve('成功添加商品')
        }
      })
    }
  }