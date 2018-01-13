import faker from 'faker';
export const Mocks = {
  ID: () => parseInt(Math.random() * 100, 10),
  String: () => 'It works!',
  Query: () => ({
    topic: () => ({
      items: []
    }),
    item: (root, args) => ({
      topic: {
        topic: args.topicId
      }
    })
  }),
  Topic: () => ({
    name: faker.internet.name(),
  }),
  Item: () => ({
    name: faker.lorem.words(Math.random() * 3),
  }),
};
export default Mocks;
