// miniprogram/pages/found/found.js  
const app=getApp()
const db=wx.cloud.database()
Page({
  data: {
    num: "1"
  },
  changeNum: function(e){
    // console.log(e)
    this.setData({
      num: e.detail.value*1+1
    })
  },
  found: function(e){
    console.log(e);
    console.log("OK")
    if(e.detail.value.intro==""||e.detail.value.info==""){
      wx.showToast({
        icon: 'error',
        title: '请完善队伍信息！',
        duration: 1500
      })
      return
    }
    //订阅消息获取用户授权
    wx.requestSubscribeMessage({
      tmplIds: ['ZdutduKwsh4BuFsDQcKGNnBMszdn0VbTvuUbwjpmcV4'],
    }).then(res=> {
      console.log('授权成功',res);
    }).catch(res=> {
      console.log('授权失败',res);
    }).finally(res=> {
      db.collection("Teams").add({
        data:{
          intro: e.detail.value.intro,
          info: e.detail.value.info,
          num: this.data.num,
          have: 0,
          member: [],
          // admin: {
          //   QQ: app.globalData.inputInfo.QQ,
          //   WeChat: app.globalData.inputInfo.WeChat
          // }
        },
        success: res=>{
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 1000
          }).then(res=> {
            this.setData({
              intro: "",
              info: "",
              num: "1"
            })
          }).then(res=> {
            setTimeout(() => {
              wx.switchTab({
                url: '../square/square',
              })
            }, 1000);
          })
        }
      })
    })
  //   db.collection("Teams").add({
  //     data:{
  //       intro: e.detail.value.intro,
  //       info: e.detail.value.info,
  //       num: this.data.num,
  //       have: 0,
  //       member: [],
  //       admin: {
  //         QQ: app.globalData.inputInfo.QQ,
  //         WeChat: app.globalData.inputInfo.WeChat
  //       }
  //     },
  //     success: res=>{
  //       wx.showToast({
  //         title: '创建成功',
  //         icon: 'success',
  //         duration: 1000
  //       }).then(res=> {
  //         this.setData({
  //           intro: "",
  //           info: "",
  //           num: "1"
  //         })
  //       }).then(res=> {
  //         setTimeout(() => {
  //           wx.switchTab({
  //             url: '../square/square',
  //           })
  //         }, 1000);
  //       })
  //     }
  //   })
  }
})