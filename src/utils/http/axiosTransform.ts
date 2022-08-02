import type { AxiosResponse } from 'axios';
import { isString } from 'lodash-es';

import { Result, RequestOptions, AxiosTransform } from '/#/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { joinTimestamp } from './helper';

export const transform: AxiosTransform = {
  /** 处理请求数据, 如果数据不是语气格式, 可直接抛出错误 */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnNativeResponse, isReturnOneResponse, isTransformResponse } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (isReturnOneResponse) {
      return res.data;
    }
    if (isTransformResponse) {
      return res.data.data;
    }
    /**
     * 这下面可以处理错误时候的返回
     */
  },
  /** 请求之前处理config */
  beforeRequestHook: (config, options) => {
    const { joinPrefix, urlPrefix, joinTime = true } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        config.data = data;
        config.params = params;
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
};
