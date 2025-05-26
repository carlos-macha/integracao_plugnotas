import cepService from "../../src/services/cepService";
import SqsService from "../../src/services/sqsService";
import { CepWorker } from "../../src/workers/cepWorker";

describe("CepWorker", () => {
  const receiveMessages = jest.fn();
  const deleteMessage = jest.fn();
  const consultCep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process and delete messages", async () => {
    const sqsMock = {
      receiveMessages,
      deleteMessage,
    } as unknown as SqsService;

    const cepMock = {
      consultCep,
    } as unknown as cepService;

    receiveMessages.mockResolvedValue([
      { Body: '{"id":"1"}', ReceiptHandle: "abc" },
    ]);

    await CepWorker(sqsMock, cepMock);

    expect(consultCep).toHaveBeenCalledWith("1");
    expect(deleteMessage).toHaveBeenCalledWith("abc");
  });

  it("should not process if no messages", async () => {
    const sqsMock = {
      receiveMessages,
      deleteMessage,
    } as unknown as SqsService;

    const cepMock = {
      consultCep,
    } as unknown as cepService;

    receiveMessages.mockResolvedValue([]);

    await CepWorker(sqsMock, cepMock);

    expect(consultCep).not.toHaveBeenCalled();
    expect(deleteMessage).not.toHaveBeenCalled();
  });
});
