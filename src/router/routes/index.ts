import { isArray } from 'lodash-es';
import type { AppRouteModule } from '/@/router/types';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).routes || {};
  const modList = isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export default routeModuleList;
