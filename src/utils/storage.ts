import Cookies from 'js-cookie';

export const Local = {
  /**
   * 设置永久缓存
   * @param key
   * @param val
   */
  set(key: string, val: any) {
    window.localStorage.setItem(key, typeof val == 'string' ? val : JSON.stringify(val));
  },
  /**
   * 获取永久缓存
   * @param key
   * @returns
   */
  get(key: string) {
    return window.localStorage.getItem(key);
  },
  /**
   * 移除永久缓存
   * @param key
   */
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  /**
   * 移除全部永久缓存
   */
  clear() {
    window.localStorage.clear();
  },
};

export const Session = {
  /**
   * 设置session缓存
   * @param key
   * @param val
   */
  set(key: string, val: any) {
    window.sessionStorage.setItem(key, typeof val == 'string' ? val : JSON.stringify(val));
  },
  /**
   * 获取session缓存
   * @param key
   * @returns
   */
  get(key: string) {
    try {
      const value = sessionStorage.getItem(key);
      if (value === null || value === undefined || value === '') {
        return null;
      }
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  },
  /**
   * 移除session缓存
   * @param key
   */
  remove(key: string) {
    window.sessionStorage.removeItem(key);
  },
  /**
   * 移除全部永久缓存
   */
  clear() {
    window.localStorage.clear();
  },
};

export const Cookie = {
  /**
   * 获取cookie缓存
   * @param key
   */
  get(key: string) {
    return Cookies.get(key);
  },
  /**
   * 设置cookie缓存
   * @param key
   * @param value
   */
  set(key: string, val: any) {
    Cookies.set(key, val);
  },
  /**
   * 删除cookie缓存
   * @param key
   */
  remove(key: string) {
    Cookies.remove(key);
  },
};
