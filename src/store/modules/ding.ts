import { defineStore } from 'pinia';
import { getDingInfo, getDingLogin } from '/@/api/login';
import { Local } from '/@/utils/storage';
import { LocalEnum } from '/@/enums/storageEnum';
import { router } from '/@/router';
import { merge } from 'lodash-es';
interface IUseDingState {
  token?: string;
  oauthId?: string;
}

export const useDingStore = defineStore('ding', {
  state: (): IUseDingState => {
    return { token: Local.get(LocalEnum.TOKEN) || '', oauthId: '' };
  },
  getters: {
    getToken(): string | undefined {
      return this.token || '';
    },
  },
  actions: {
    /** 钉钉登录 */
    async dingLogin(code) {
      const res = await getDingInfo(code);
      if (res.access_token) {
        this.token = res.access_token;
        Local.set(LocalEnum.TOKEN, this.token);
      } else {
        this.oauthId = res.oauthId;
      }
    },
    /** 退出登录 */
    dingLogout() {
      Local.clear();
      router.push('/login');
    },
    /** 用户登录 */
    async userLogin(form) {
      const data = merge(form, { oauthId: this.oauthId });
      const res = await getDingLogin(data);
      this.token = res.access_token;
      Local.set(LocalEnum.TOKEN, this.token);
      router.push('/home');
    },
  },
});
