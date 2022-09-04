import { HttpResponse } from "./httpResponse";

export interface BaseController {
  handle(...args: any): Promise<HttpResponse>
}