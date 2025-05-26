const mockSend = jest.fn();

jest.doMock("@aws-sdk/client-sqs", () => {
  const originalModule = jest.requireActual("@aws-sdk/client-sqs");
  return {
    ...originalModule,
    SQSClient: jest.fn(() => ({ send: mockSend })),
    ReceiveMessageCommand: jest.fn((params) => params),
    DeleteMessageCommand: jest.fn((params) => params),
  };
});

import SqsService from "../../src/services/sqsService";

describe("SqsService", () => {
  const service = new SqsService();

  afterEach(() => jest.clearAllMocks());

  it("should receive messages", async () => {
    mockSend.mockResolvedValue({
      Messages: [{ Body: '{"id":"123"}', ReceiptHandle: "abc" }],
    });

    const messages = await service.receiveMessages();

    expect(messages).toHaveLength(1);
    expect(mockSend).toHaveBeenCalled();
  });

  it("should return empty array when no messages", async () => {
    mockSend.mockResolvedValue({});

    const messages = await service.receiveMessages();

    expect(messages).toEqual([]);
    expect(mockSend).toHaveBeenCalled();
  });

  it("should delete message", async () => {
    await service.deleteMessage("abc");

    expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
      ReceiptHandle: "abc"
    }));
  });
});
