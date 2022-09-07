import { HttpResponse } from "../contracts/httpResponse"

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: {}
})

export const forbidden = (error: Error | any): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const badRequest = (error: Error | any): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (error: Error | any): HttpResponse => ({
  statusCode: 401,
  body: error
})

export const serverError = (error: Error | any): HttpResponse => ({
  statusCode: 500,
  body: error
})