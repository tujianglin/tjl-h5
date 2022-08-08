import { defHttp } from '/@/utils/http';
import { InfoDetail } from './model/appModel';

export const codeLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/code-login`,
    params,
  });
};

export const appLogin = (params) => {
  return defHttp.get<InfoDetail>({
    url: `/blade-auth/oauth/app/login`,
    params,
  });
};
