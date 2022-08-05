import { getCurrentInstance, ComponentCustomProperties } from 'vue';

/**
 * 获取全局属性
 * @returns proxy
 */
export function useInstance() {
  const instance = getCurrentInstance();
  return instance?.proxy as ComponentCustomProperties;
}
