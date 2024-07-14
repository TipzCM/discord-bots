const { Events, MessageEmbed } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        const client = member.client;
        const memberName = member.displayName;
        
        const guild = member.guild;

        if (!guild.available) {
            console.error("Server outage; cannot greet");
            return;
        }

        const welcome = new MessageEmbed()
            .setAuthor('Hello World Bot')
            .setDescription(`Welcome ${memberName} to Guelph's Discord Server!`)
            .setColor('#6495ed');
        
        // this is our #general channel
        guild.channels.cache.get('1176196328292888672')
            .send(wecome)
            .catch(err=> {
                console.error(err);
            });
    }
};