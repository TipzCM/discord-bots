const { Events, EmbedBuilder } = require('discord.js');
const { dirname } = require('path');
//const { isAllowedUser } = require(dirname(require.main.filename) + '/other/allowedUsers.js');
const { isAllowedUser } = require('../other/allowedUsers');
const { words } = require(dirname(require.main.filename) + '/verboten-words.json');



const bannedWords = {};
for (word of words) {
    bannedWords[word.word] = {
        "response": word.response,
        "todelete": word.todelete
    }
}

const handleMessage = function(message, word) {
    var userName = message.author.displayName;

    if (word.todelete) {
        message.delete().then(msg => {
            console.log(`Deleted message from ${userName}`);
        }).catch(console.error);
    }
    if (word.response) {
        message.channel.send(`${word.response}`)
        .catch(console.error);
    }
}


module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        var user = message.author;
        if (!isAllowedUser(user.id)) {
            return;
        }

        var content = message.content;

        //most severe responses should be at the top;
        // so if a message contains multiple words, we check them
        // only once
        for (word in bannedWords) {
            if (content.indexOf(word) >= 0) {
                handleMessage(message, bannedWords[word]);
                break;
            }
        }
    }
};