var amapFile = require('../../libs/amap-wx.js');
var markersData = [];
Page({
  data: {
      latitude: 23.099994,
      longitude: 113.324520,
      textData: {},
      markers: [],
  },
  onReady: function (e) {
    // this.mapCtx = wx.createMapContext('myMap')
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
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

    // var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'ed7c741dbc43f1946bf8ee60384825b5' });
    
    myAmapFun.getPoiAround({
      iconPathSelected: '../../img/marker_checked.png', //如：..­/..­/img/marker_checked.png
      iconPath: '../../img/marker.png', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../img/marker_checked.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../img/marker.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})