import { ADD_COUNTER, ADD_TO_CART } from './types'
export default {
  addCart(context, data) {
    //查找之前数组中是否有该商品
    let result = context.state.cartList.find(item =>item.iid===data.iid)
    // 利用actions分发多个commit事件用于调试
    if (result) {
      context.commit(ADD_COUNTER, result)
    } else {
      data.count=1
      context.commit(ADD_TO_CART, data)
    }
  }
};
