import { _ } from 'lodash';
import faker from 'faker';
import Sequelize from 'sequelize';

const db = new Sequelize('booklist', null, null, {
	dialect: 'sqlite',
	storage: './booklist.sqlite',
	logging: false
});

const TopicModel = db.define('topic', {
	name: { type: Sequelize.STRING },
});

const ItemModel = db.define('item', {
	name: { type: Sequelize.STRING },
});

ItemModel.belongsTo(TopicModel);
TopicModel.belongsToMany(ItemModel, { through: 'TopicItem'});

const TOPICS = 3;
const ITEMS_PER_TOPIC = 2;

db.sync({ force: true }).then(() => _.times(TOPICS, () =>
	TopicModel.create({
		name: faker.lorem.words(1),
	}).then(topic => _.times(ITEMS_PER_TOPIC, () => {
		return topic.createItem({
			name: faker.lorem.words(3)
		}).then((item) => {
			console.log('{ name }', `{${item.name}}`)
			return item;
		})
	}))
));

const Topic = db.models.topic;
const Item = db.models.item;

export { Topic, Item };

