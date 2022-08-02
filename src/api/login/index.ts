import { defHttp } from '/@/utils/http';
import { getAppListResultModel } from './model/appModel';

enum Api {
  GetAppList = '/blade-system/application/list',
  Get = '/get',
}

export const getList = () => {
  // return defHttp.get<getAppListResultModel[]>({ url: Api.GetAppList });
  return defHttp.get<getAppListResultModel[]>(
    { url: Api.GetAppList },
    { isTransformResponse: true },
  );
};

export const getMock = () => {
  return defHttp.get({ url: Api.Get });
};
