const Topic = require('./topic');
const Item = require('./item');

Topic.hasMany(Item);
Item.belongsTo(Topic);

module.exports = { Topic, Item };
