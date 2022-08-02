import { defHttp } from '/@/utils/http';
import { getAppListResultModel } from './model/appModel';

enum Api {
  GetAppList = '/blade-system/application/list',
}

export const getList = () => {
  // return defHttp.get<getAppListResultModel[]>({ url: Api.GetAppList });
  return defHttp.get<getAppListResultModel[]>(
    { url: Api.GetAppList },
    { isTransformResponse: true },
  );
};
