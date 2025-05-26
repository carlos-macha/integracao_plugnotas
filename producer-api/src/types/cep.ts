import { Request, Response } from "express";

export interface CepRequestBody {
  cep: string;
}

export interface CepSuccessResponse {
  message: string;
  data: any;
}

export interface CepErrorResponse {
  error: string;
}

export type CepRequest = Request<{}, {}, CepRequestBody>;
export type CepResponse = Response<CepSuccessResponse | CepErrorResponse>;
