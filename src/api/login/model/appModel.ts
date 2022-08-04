export interface InfoDetail {
  /** token */
  access_token?: string;
  account?: string;
  avatar?: string;
  dept_id?: string;
  detail?: {
    type?: string;
  };
  /** 失效时间 */
  expires_in?: number;
  license?: string;
  nick_name?: string;
  oauth_id?: string;
  post_id?: string;
  /** 失效重置token */
  refresh_token?: string;
  role_id?: string;
  role_name?: string;
  tenant_id?: string;
  token_type?: string;
  user_id?: string;
  user_name?: string;
  oauthId?: string;
}
