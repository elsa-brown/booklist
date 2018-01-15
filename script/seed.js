const db = require('../server/db');
const { Topic, Item } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced');

	// seed topics
	const topics = await Promise.all([
		Topic.create({
			name: 'tech'
		}),
		Topic.create({
			name: 'fiction'
		}),
		Topic.create({
			name: 'art'
		}),
	]);
	console.log(`seeded ${topics.length} topics`);

	// seed items
	const items = await Promise.all([
		Item.create({ 
			name: 'Microserfs'
		}),
		Item.create({ 
			name: 'A Room Of One\'s Own'
		}),
		Item.create({ 
			name: 'Weaving The Web'
		}),
	]);
	await items[0].setTopic(2);
	await items[1].setTopic(2);
	await items[2].setTopic(1);
	console.log(`seeded ${items.length} items`);

	console.log(`seeded sucessfully`);
}

seed()
	.catch(err => {
		console.error(err.message);
		console.error(err.stack);
		process.exitCode = 1;
	})
	.then(() => {
		console.log('closing db connection');
		db.close();
		console.log('db connection closed');
	});

console.log('seeding...');