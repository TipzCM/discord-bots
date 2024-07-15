const { Events, EmbedBuilder } = require('discord.js');

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

        const msg = new EmbedBuilder()
            .setAuthor({
                "name": "Hello world bot"
            })
            .setTitle('Goodbye message')
            .setDescription(`We're so sad to see ${memberName} leave us; we hardly got to know them.`)
            .setColor('#ff0000');
        
        // this is our #general channel
        guild.channels.cache.get('1176196328292888672')
            .send({
                embeds: [msg]
            })
            .catch(err=> {
                console.error(err);
            });
    }
};