import { defHttp } from '/@/utils/http';
import { InfoDetail } from './model/appModel';

export const getDingInfo = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/code-login`,
    params,
  });
};

export const getDingLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/login`,
    params,
  });
};

export const getWxLogin = (source) => {
  return defHttp.get<any>({
    url: `/blade-auth/oauth/render/${source}`,
  });
};
