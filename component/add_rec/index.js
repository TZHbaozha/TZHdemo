var in_dec = require('../../pages/in_dec/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    numArr : null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addgoods : function(e){
      in_dec(e,this.properties.num,'numArr',this);
      this.setData({
        numArr : this.properties.num
      })

      // this.triggerEvent('myevent',e.currentTarget.id)
    }
  }
})
