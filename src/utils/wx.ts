/**
 * 获取重定位的 OAuth 路径
 * url 需要重定向的页面路径 可传可不传
 * @returns {string}
 */

import qs from 'qs';
import wx from 'weixin-js-sdk';
import jsdk from 'wecomjsdk';
import { getWxSign } from '/@/api/login/index';

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
export async function qywxJssdkInit() {
  const params = await getWxSign({ url: 'http://frp.linkvision.cloud:33001/', isAgent: false });
  wx.config({
    beta: true,
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: [
      'openUserProfile',
      'selectEnterpriseContact',
      'chooseImage',
      'scanQRCode',
      'shareWechatMessage',
    ],
  });

  wx.ready(function () {
    console.log('微信sdk基础环境初始化成功');
    wxReady();
  });
  wx.checkJsApi({
    jsApiList: [
      'selectEnterpriseContact',
      'selectExternalContact',
      'chooseImage',
      'scanQRCode',
      'shareWechatMessage',
    ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {
      console.log(res);
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    },
  });
  wx.error(function (err) {
    console.log(err);
  });
}

async function wxReady() {
  const params = await getWxSign({ url: 'http://frp.linkvision.cloud:33001', isAgent: true });
  jsdk.agentConfig({
    corpid: params.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
    agentid: '1000004', // 必填，企业微信的应用id （e.g. 1000247）
    timestamp: params.timestamp, // 必填，生成签名的时间戳
    nonceStr: params.nonceStr, // 必填，生成签名的随机串
    signature: params.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: ['selectExternalContact'],
    success: function () {
      console.log('企微应用初始化成功，相关应用特殊API需要在这之后触发');
    },
    fail: function (err) {
      if (err.errMsg.indexOf('function not exist') > -1) {
        alert('版本过低请升级');
      } else {
        console.log(err);
      }
    },
  });
}
