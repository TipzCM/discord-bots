const { Events, EmbedBuilder } = require('discord.js');
const { dirname } = require('path');
const { isAllowedUser } = require('../other/allowedUsers');
const { words } = require(dirname(require.main.filename) + '/verboten-words.json');


const bannedWords = {};
for (word of words) {
    bannedWords[word.word] = word;
}

/**
 * Handle a banned word
 */
const handleBannedWord = function(message, word) {
    var userName = message.author.displayName;

    var content = message.content;
    if (word.acceptable) {
        for (au of word.acceptable) {
            if (au.regex) {
                var withoutValidUsages = content.replace(new RegExp(au.regex, 'gim'), '');
                if (withoutValidUsages.toLowerCase().indexOf(word.word) == -1) {
                    // no longer contains;
                    // this is valid text
                    return;
                }
            }
        }
    }

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
        var content = message.content;

        //most severe responses should be at the top;
        // so if a message contains multiple words, we check them
        // only once
        for (word in bannedWords) {
            if (content.toLowerCase().indexOf(word) >= 0) {
                handleBannedWord(message, bannedWords[word]);
                break;
            }
        }

        // TODO - other response if we want
    }
};