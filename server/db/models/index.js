// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./contact');
require('./email');
require('./handbook');
require('./launch');
require('./nominate');
require('./question');
require('./user');
require('./webinarQuestion.js')