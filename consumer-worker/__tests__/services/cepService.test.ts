import CepService from "../../src/services/cepService";
import axios from "axios";
import Cep from "../../src/model/cepModel";
import { HttpError } from "../../src/errors/HttpError";

jest.mock("axios");
jest.mock("../../src/model/cepModel");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

(Cep.findById as any) = mockFindById;
(Cep.findByIdAndUpdate as any) = mockFindByIdAndUpdate;

describe("CepService", () => {
  const service = new CepService();

  afterEach(() => jest.clearAllMocks());

  it("should throw if CEP not found in DB", async () => {
    mockFindById.mockResolvedValue(null);
    await expect(service.consultCep("invalid-id")).rejects.toThrow(HttpError);
  });

  it("should reject if viacep returns error", async () => {
    mockFindById.mockResolvedValue({ _id: "123", cep: "00000000" });
    mockedAxios.get.mockResolvedValue({ data: { erro: true } });

    await expect(service.consultCep("123")).rejects.toThrow("CEP inválido.");
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("123", { status: "REJEITADO" });
  });

  it("should update CEP with data and status", async () => {
    mockFindById.mockResolvedValue({ _id: "123", cep: "01001000" });
    mockedAxios.get.mockResolvedValue({ data: { cep: "01001-000", logradouro: "Praça da Sé" } });

    await service.consultCep("123");
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("123", expect.objectContaining({ status: "CONCLUIDO" }));
  });
});
