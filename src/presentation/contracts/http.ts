export interface HttpRequest<T = any> {
  body: T;
}

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export type HttpResponseError = {
  error: string;
};

export const ok = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

export const badRequest = (error: Error): HttpResponse<HttpResponseError> => ({
  statusCode: 400,
  body: { error: error.message },
});

export const serverError = (error: Error): HttpResponse<HttpResponseError> => ({
  statusCode: 500,
  body: { error: error.message },
});
