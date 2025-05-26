import CepService from "../../src/services/cepService";
import Cep from "../../src/models/cepModel";
import * as sqsService from "../../src/services/sqsService";

describe("CepService", () => {
  let service: CepService;

  beforeEach(() => {
    service = new CepService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw error for invalid CEP", async () => {
    await expect(service.saveCep("123")).rejects.toThrow("This CEP is invalid");
  });

  it("should throw error if CEP is not a string", async () => {
    await expect(service.saveCep(12345678 as any)).rejects.toThrow("CEP must be a string");
  });

  it("should throw error for invalid CEP format", async () => {
    await expect(service.saveCep("123")).rejects.toThrow("This CEP is invalid");
  });

  it("should throw error if CEP already exists", async () => {
    jest.spyOn(Cep, "findOne").mockResolvedValue({ cep: "12345678" });
    await expect(service.saveCep("12345678")).rejects.toThrow("This CEP already exists");
  });

  it("should throw 500 error for unexpected errors", async () => {
    jest.spyOn(Cep, "findOne").mockImplementation(() => {
      throw new Error("Database down");
    });

    await expect(service.saveCep("12345678")).rejects.toThrow("Database down");
  });

  it("should save CEP if it is valid and new", async () => {
    jest.spyOn(Cep, "findOne").mockResolvedValue(null);

    const fakeCep = { id: "abc123", cep: "12345678" };
    jest.spyOn(Cep, "create").mockResolvedValue(fakeCep as any);

    const sendMessageSpy = jest
      .spyOn(sqsService, "sendMessageToQueue")
      .mockResolvedValue({ success: true } as any);

    const response = await service.saveCep("12345-678");

    expect(response.status).toBe(201);
    expect(response.message).toEqual(fakeCep);
    expect(sendMessageSpy).toHaveBeenCalledWith("abc123");
  });
});
