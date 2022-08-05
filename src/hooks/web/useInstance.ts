import { getCurrentInstance, ComponentCustomProperties } from 'vue';

export function useInstance() {
  const instance = getCurrentInstance();
  return instance?.proxy as ComponentCustomProperties;
}
