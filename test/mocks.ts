export const mockRepo = {
  create: jest.fn(),
  save: jest.fn().mockImplementation(async () => {
    console.log('saved.');
  }),
  findOneOrFail: jest.fn(),
  findOne: jest.fn().mockResolvedValue({ value: 1 }),
  delete: jest.fn()
};
