module.exports = (e,arr,target,self) => {

  const cratId = e.currentTarget.dataset.id;
  const typeId = e.currentTarget.id;
  if (typeId == "add_btn") {
    ++arr[cratId];
  } else if (typeId == "reduc_btn") {
    if (arr[cratId] == 0) {
      return;
    }
    --arr[cratId];
  } else {
    return;
  }
  self.setData({
    [target] : arr,
  });
  const crat_sum = sum().toString();
  if (crat_sum == "0") {
    wx.removeTabBarBadge({
      index: 3
    });
  } else {
    wx.setTabBarBadge({
      // tabBar 某一项的右上角添加文本
      index: 3,
      text: crat_sum
    });
  }

  function sum() {
    return arr.reduce(function(ele, res) {
      return ele + res;
    });
  }
};
