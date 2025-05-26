import { Document } from "mongoose";

export interface CepData extends Document {
  cep: string;
  data?: any;
  status?: string;
}

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export type CepStatus = "REJEITADO" | "CONCLUIDO";
