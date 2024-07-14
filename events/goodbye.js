const { Events, MessageEmbed } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    execute(member) {
        const client = member.client;
        const memberName = member.displayName;
        
        const guild = member.guild;

        if (!guild.available) {
            console.error("Server outage; cannot greet");
            return;
        }

        const msg = new MessageEmbed()
            .setAuthor('Hello World Bot')
            .setDescription(`We're so sad to see ${memberName} leave us; we hardly got to know them.`)
            .setColor('#ff0000');
        
        // this is our #general channel
        guild.channels.cache.get('1176196328292888672')
            .send(msg)
            .catch(err=> {
                console.error(err);
            });
    }
};