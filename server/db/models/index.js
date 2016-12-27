// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
const comment = require('./comment');
require('./contact');
const discussion = require('./discussion');
require('./email');
require('./handbook');
require('./launch');
require('./nominate');
require('./question');
require('./user');

module.exports = {
	comment,
	discussion
}
