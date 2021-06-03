module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (reaction, user, client, Discord) => {
        const message = reaction.message;
        const reactions = message.reactions;
        const channel_id = reaction.message.channel.id;

        const everyone = message.guild.roles.cache.get('744192330344431797');

        if (!reaction.partial) return;


        /* Remove Automatically User Reactions */
        await reaction.users.remove(user);


        if (channel_id === '849817571456843787') {
            message.guild.channels.create(`ticket ${user.username}`, {type: 'text'}).then(channel => {
                let category = message.guild.channels.cache.get('849823383507697734');
                channel.setParent(category);

                channel.updateOverwrite(everyone, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                }).then(async channel_t => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Ticket de demande d'aide")
                        .setColor('#5e00ff')
                        .setDescription(`<@${user.id}> Tu peux poser ta question ou exposer ton problème ici.\n` +
                            "Les autres pourront ainsi t'aider le résoudre\n" +
                            "Pour une meilleur comprehension du sujet merci de respecter les règles suivantes :")
                        .addFields({name: "Définis le language", value: "JAVA, Python, etc, ..."},
                            {name: "Enonce clairement ton problème", value: "Je ne comprend pas comment faire une recherche Google ?"},
                            {name: "Ajoute du code/image", value: "\`from maths import *\`"},
                            {name: "Merci de fermé le ticket", value: "Réagit sur la réaction ❌"})

                    const t = await channel_t.send(embed);
                    t.react('❌');
                })
            });
        }


    }
}