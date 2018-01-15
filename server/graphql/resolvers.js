import { Topic, Item } from './connectors';
import _ from 'lodash';

const resolvers = {
  Query: {
    topics: () => {
      return Topic.findAll();
    },
    topic: (root, { id }) => {
      return Topic.findById({ id });
    },
    items: () => {
      return Item.findAll()
    }
  },
  Topic: {
    items(topic) {
      return Item.findAll({
        where: {topic: topic.name}
      });
    }
  },
  Item: {
    topic(item) {
      return item.getTopic()
    }
  }
  // Mutation: {
  //   addTopic: (root, args) => {
  //     const newTopic = { id: String(nextId++), items: [], name: args.name };
  //     topics.push(newTopic);
  //     return newTopic;
  //   },
  //   addItem: (root, { item }) => {
  //     const topic = topics.find(topic => topic.id === item.topicId);
  //     if (!topic) throw new Error('topic does not exist!')

  //     const newItem = { id: String(nextItemId++), name: item.name };
  //     topic.items.push(newItem);
  //     return newItem;
  //   }
  //},
};

export default resolvers;