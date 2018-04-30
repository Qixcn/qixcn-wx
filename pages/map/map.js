Page({
  data: {
      latitude: 23.099994,
      longitude: 113.324520
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    var that=this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // var latitude = res.latitude // 经度
        // var longitude = res.longitude // 纬度
        // console.log(latitude, longitude)
        that.setData({
          latitude:res.latitude,
          longitude: res.longitude
          })
      }
    })
  }
})