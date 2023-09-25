export interface IRoute {
  path: string;
  method: RouteMethodEnum;
  action: string;
  controller: any;
}

export enum RouteMethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}