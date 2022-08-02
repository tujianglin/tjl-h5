import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { cloneDeep, isFunction } from 'lodash-es';

import { Result, CreateAxiosOptions, RequestOptions } from '/#/axios';
import { RequestEnum } from '/@/enums/httpEnum';

export class Axios {
  /** 请求实例 */
  private axiosInstance: AxiosInstance;
  /** 请求配置 */
  private readonly options: CreateAxiosOptions;

  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /** get请求 */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options);
  }

  /** post请求 */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options);
  }

  /** get请求 */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options);
  }

  /** get请求 */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options);
  }

  /** 请求方法 */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const transform = this.getTransform();
    const { beforeRequestHook, transformRequestHook } = transform || {};

    // 请求前处理 config
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 处理返回数据
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err);
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
