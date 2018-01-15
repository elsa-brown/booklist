const Topic = require('./topic');
const Item = require('./item');

Item.belongsTo(Topic);

module.exports = { Topic, Item };
