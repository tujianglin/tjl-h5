import { defineStore } from 'pinia';
import { codeLogin, appLogin } from '/@/api/login';
import { Local } from '/@/utils/storage';
import { LocalEnum, EnvEnum } from '/@/enums/storageEnum';
import { router } from '/@/router';
import { merge } from 'lodash-es';
import { useInstance } from '/@/hooks/web/useInstance';
import { checkRedirect, qywxJssdkInit } from '/@/utils/wx';

interface IUseLoginState {
  token?: string;
  oauthId?: string;
}

export const useLoginStore = defineStore('login', {
  state: (): IUseLoginState => {
    return { token: Local.get(LocalEnum.TOKEN) || '', oauthId: Local.get(LocalEnum.AUTHID) || '' };
  },
  getters: {
    getToken(): string | undefined {
      return this.token || '';
    },
  },
  actions: {
    /** 钉钉登录 */
    async codeLogin(params) {
      const res = await codeLogin(params);
      let oauthId = '';
      if (res.access_token) {
        this.token = res.access_token;
        oauthId = res.oauth_id as string;
        Local.set(LocalEnum.TOKEN, this.token);
        router.push('/home');
      } else {
        oauthId = res.oauthId as string;
      }
      this.oauthId = oauthId;
      Local.set(LocalEnum.AUTHID, this.oauthId);
    },
    /** 退出登录 */
    Logout() {
      Local.clear();
      router.push('/');
    },
    /** 用户登录 */
    async userLogin(form) {
      const data = merge(form, {
        oauthId: this.oauthId,
      });
      const res = await appLogin(data);
      this.token = res.access_token;
      this.oauthId = res.oauth_id;
      Local.set(LocalEnum.TOKEN, this.token);
      Local.set(LocalEnum.AUTHID, this.oauthId);
      router.push('/home');
    },
    /** 多端登录 */
    async Login() {
      if (!this.token) {
        const { $dd, $wx } = useInstance();
        // 钉钉登录
        if ($dd) {
          const res = await $dd.runtime.permission.requestAuthCode({
            corpId: 'ding648462dcbd460319acaaa37764f94726',
          });
          const params = {
            code: res.code,
            state: '',
            source: EnvEnum.DD,
          };
          this.codeLogin(params);
        }
        // 企微登录
        if ($wx) {
          const res = checkRedirect();
          const params = {
            ...res,
            source: EnvEnum.WX,
          };
          this.codeLogin(params);
        }
      }
    },
    /** 微信签名 */
    async getSign() {
      await qywxJssdkInit();
    },
  },
});
