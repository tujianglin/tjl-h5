import { defHttp } from '/@/utils/http';
import { InfoDetail } from './model/appModel';
/** code登录 */
export const codeLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/code-login`,
    params,
  });
};

/** 应用登录 */
export const appLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/login`,
    params,
  });
};

/** 获取微信签名 */
export const getWxSign = (params) => {
  return defHttp.get({
    url: `/blade-auth/oauth/app/wechat-enterprise-web/sign`,
    params,
  });
};
