const { dirname } = require('path');
const { users } = require(dirname(require.main.filename) + '/valid-users.json');

const allowedUsers = {};
console.log("Allowed users include...");
for (user of users) {
    console.log(user.name);
    allowedUsers[user.id] = true;
}

const isAllowedUser = function(id) {
    return allowedUsers[id];
}

module.exports = { isAllowedUser }