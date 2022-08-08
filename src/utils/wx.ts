/**
 * 获取重定位的 OAuth 路径
 * url 需要重定向的页面路径 可传可不传
 * @returns {string}
 */

import qs from 'qs';

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
