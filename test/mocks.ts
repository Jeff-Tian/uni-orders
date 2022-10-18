export const mockRepo = {
  create: jest.fn(),
  save: jest.fn(),
  findOneOrFail: jest.fn(),
  findOne: jest.fn().mockResolvedValue({ value: 1 }),
};
