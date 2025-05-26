import CepController from "../../src/controllers/cepController";
import { Request, Response, NextFunction } from "express";

describe("CepController", () => {
  let controller: CepController;
  let mockService: any;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    mockService = {
      saveCep: jest.fn(),
    };

    controller = new CepController(mockService);

    req = {
      body: { cep: "12345-678" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should return 201 and success message when CEP is saved", async () => {
    const mockResponse = { message: { id: "abc123", cep: "12345678" } };
    mockService.saveCep.mockResolvedValue(mockResponse);

    await controller.sendMessage(req as Request, res as Response, next as NextFunction);

    expect(mockService.saveCep).toHaveBeenCalledWith("12345-678");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "CEP created successfully",
      data: mockResponse.message,
    });
  });

  it("should call next with error when service throws", async () => {
    const error = new Error("Something went wrong");
    mockService.saveCep.mockRejectedValue(error);

    await controller.sendMessage(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledWith(error);
  });
});
