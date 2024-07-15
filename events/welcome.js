const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        console.log(`Hello ${member.displayName}`);

        const client = member.client;
        const memberName = member.displayName;
        
        const guild = member.guild;

        if (!guild.available) {
            console.error("Server outage; cannot greet");
            return;
        }

        const welcome = new EmbedBuilder()
            .setAuthor({
                "name": "Hello-world bot"
            })
            .setTitle('Welcome Message')
            .setDescription(`Welcome ${memberName} to Guelph's Discord Server!`)
            .setColor('#6495ed');
        
        // this is our #general channel
        guild.channels.cache.get('1176196328292888672')
            .send({
                embeds: [welcome]
            })
            .catch(err=> {
                console.error(err);
            });
    }
};