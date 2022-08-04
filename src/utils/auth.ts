import { Local } from './storage';
import { LocalEnum } from '/@/enums/storageEnum';

export function getToken() {
  return Local.get(LocalEnum.TOKEN);
}
