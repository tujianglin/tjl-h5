/**
 * 获取重定位的 OAuth 路径
 * url 需要重定向的页面路径 可传可不传
 * @returns {string}
 */

import qs from 'qs';
import wx from 'weixin-js-sdk';
import jsdk from 'wecomjsdk';

export const generateOAuthUrl = (url?: any) => {
  const redirectUri = url || 'http://frp.linkvision.cloud:33001/';
  const searchObj = {
    appid: 'ww90652807a231e44a',
    redirect_uri: encodeURIComponent(redirectUri),
    response_type: 'code',
    scope: 'snsapi_base',
    agentid: '1000004',
    state: 'A',
  };
  const search = Object.entries(searchObj)
    .map((entry) => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('&');
  return `https://open.weixin.qq.com/connect/oauth2/authorize?${search}#wechat_redirect`;
};

/**
 * 判断当前网页是否需要重定向
 */
export const checkRedirect = () => {
  const codeExist = window.location.search.includes('code');
  // 判断是否需要重定向
  if (!codeExist) {
    window.location.replace(generateOAuthUrl());
  } else {
    const code = qs.parse(window.location.search.slice(1)).code as string;
    const state = qs.parse(window.location.search.slice(2)).state as string;
    return {
      code,
      state,
    };
  }
};

// 企微 JSSDK 初始化
export function qywxJssdkInit(params: any) {
  wx.config({
    beta: false,
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: ['onMenuShareAppMessage'],
  });
  wx.ready(function () {
    console.log('微信sdk基础环境初始化成功');
    wxReady(params);
  });

  wx.error(function (err) {
    console.log('jWeixin.error:', err);
  });
}

function wxReady(config: any) {
  jsdk.agentConfig({
    corpid: config.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
    agentid: config.agentId, // 必填，企业微信的应用id （e.g. 1000247）
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.appSignature, // 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: [],
    success: function () {
      console.log('企微应用初始化成功，相关应用特殊API需要在这之后触发');
    },
    fail: function (err) {
      if (err.errMsg.indexOf('function not exist') > -1) {
        alert('版本过低请升级');
      } else {
        alert(err + JSON.stringify(err));
      }
    },
  });
}
