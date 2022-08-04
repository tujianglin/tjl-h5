import { defHttp } from '/@/utils/http';
import { InfoDetail } from './model/appModel';

export const getDingInfo = (code) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/ding-micro-app/${code}`,
  });
};

export const getDingLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/ding-micro-app/login`,
    params,
  });
};
