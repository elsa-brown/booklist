const Item = require('./item');
const Topic = require('./topic');
const User = require('./user');


Topic.hasMany(Item);
Item.belongsTo(Topic);

module.exports = { Item, Topic, User };
