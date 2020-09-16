import { ADD_COUNTER, ADD_TO_CART } from './types'

export default {
  // id相同的时候购物车叠加数量
  [ADD_COUNTER](state, data) {
    data.count++;
  },
  // 往购物车push数据
  [ADD_TO_CART](state, data) {
    data.checked=true
    state.cartList.push(data);
  }
};
