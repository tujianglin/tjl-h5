import { Interface, CodeGenerator, Mod } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  /** 获取接口内容的类型定义代码 */
  getInterfaceContentInDeclaration(inter: Interface) {
    let requestParams = inter.getRequestParams();
    const paramsCode = inter.getParamsCode('Params');
    requestParams = requestParams.replace('body', 'data');

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function ${inter.name}(${requestParams}): Promise<Response>;
    `;
  }
  /** 获取接口实现内容的代码 */
  getInterfaceContent(inter: Interface) {
    // 请求类型
    const method = inter.method.toLowerCase();
    // 接口传参
    const Interface = inter.getParamsCode().replace(/class/, 'interface');
    // 请求参数
    let requestParams = inter.getRequestParams(this.surrounding);
    // 描述
    const index = inter.description.indexOf('\n');
    const description = inter.description.substring(0, index);
    const body = requestParams.includes('body') ? 'data' : '';
    const before = inter.path.indexOf('{');
    const after = inter.path.indexOf('}');
    let id = '';
    if (before && after) {
      id = inter.path.substring(before + 1, after);
      requestParams = `${requestParams}, ${id}`;
    }
    requestParams = requestParams.replace('body', 'data');
    requestParams = requestParams.replace('options?: any', 'options?: RequestOptions');
    if (id) {
      requestParams = requestParams.replace(id, `${id}?: any`);
    }
    const path = inter.path.replace('{', '${');
    return `
     import { defHttp } from '/@/utils/http/axios';
     import type { RequestOptions } from '/#/axios';

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    ${Interface}
    /**
     * @desc ${description}
     */
    export function ${inter.name}(${requestParams}) {
      return defHttp.${method}<${inter.responseType}>(
        { 
          url: ${'`'}${path}${'`'}, 
          params, 
          ${body} 
        }, 
        { 
          ...options 
        }
      )
    }
   `;
  }
  /** 获取单个模块的 index 入口文件 */
  getModIndex(mod: Mod): string {
    return `
      /**
       * @description ${mod.description}
       */
      ${mod.interfaces
        .map((inter) => {
          return `export { ${inter.name} } from './${inter.name}';`;
        })
        .join('\n')}
    `;
  }
}
