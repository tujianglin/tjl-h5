export interface getAppListResultModel {
  backgroundUrl?: string;
  code?: string;
  domain?: string;
  id?: string;
  logo?: string;
  name?: string;
  remark?: string;
  sort?: number;
}

export interface getAppLogoResultModel {
  list: {
    contentLength?: number;
    fileName?: string;
    id?: string;
    link?: string;
    objectKey?: string;
    suffix?: string;
    type?: 0 | 1;
  }[];
}
