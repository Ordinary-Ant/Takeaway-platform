// 包含多个state的getter计算属性的对象
export default {
  // 购物车商品总数
  totalCount (state) {
    // 相当于0 + food1.count + food2.count
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  // 购物车商品总价格
  totalPrice (state) {
    // 相当于0 + food1.count * food1.price + food2.count * food2.price
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  // 统计满意的评论数
  positiveSize (state) {
    return state.ratings.reduce((preTotal, ratings) => preTotal + (ratings.rateType === 0 ? 1 : 0), 0)
  }
}
