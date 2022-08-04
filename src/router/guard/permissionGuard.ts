import { Router } from 'vue-router';
import { getToken } from '/@/utils/auth';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (getToken()) {
      if (to.path === '/login') {
        next('/home');
      } else {
        next();
      }
    } else {
      next();
    }
  });
}
