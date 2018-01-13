const topics = [{
  id: '1',
  name: 'tech',
  description: 'tech books',
  items: [{
    id: '1',
    name: 'Weaving The Web',
  }]
}, {
  id: '2',
  name: 'fiction',
  description: 'fiction books',
  items: [{
    id: '2',
    name: 'Microserfs',
  }, {
    id: '3',
    name: 'A Room Of Ones Own',
  }]
}];
let nextId = 3;
let nextItemId = 5;

export const resolvers = {
  Query: {
    topics: () => {
      return topics;
    },
    topic: (root, { id }) => {
      return topics.find(topic => topic.id === id);
    }
  },
  Mutation: {
    addTopic: (root, args) => {
      const newTopic = { id: String(nextId++), items: [], name: args.name };
      topics.push(newTopic);
      return newTopic;
    },
    addItem: (root, { item }) => {
      const topic = topics.find(topic => topic.id === item.topicId);
      if (!topic) throw new Error('topic does not exist!')

      const newItem = { id: String(nextItemId++), name: item.name };
      topic.items.push(newItem);
      return newItem;
    }
  },
};
