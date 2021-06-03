module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (reaction, user, client, Discord) => {
        const message = reaction.message;
        const reactions = message.reactions;
        const channel_id = reaction.message.channel.id;

        const everyone = message.guild.roles.cache.get(process.env.EVERYONE);

        if (!reaction.partial) return;


        if (channel_id === process.env.CHANNEL_START) {
            console.log("test")
            await reaction.users.remove(user);

            const language_reactions = [
                '849947825173037056',
                '849947825068048444',
                '849947825117593620',
                '849947825026629693',
                '849947825227300874',
                '849947825105535036',
                '849947825043013642',
                '849947825043537940',
                '849959938880962570'
            ];

            await reactions.cache.forEach((item, key, obj) => {
                if (!language_reactions.includes(key)) return

                const language = item.emoji.name !== 'a_'? item.emoji.name : 'autre';

                message.guild.channels.create(`${language}-${user.username}`, {type: 'text'}).then(async channel => {
                    let category = message.guild.channels.cache.get(process.env.CAT_OPEN);
                    await channel.setParent(category);

                    await channel.updateOverwrite(everyone, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                    }).then(async channel_t => {

                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Demande d'aide en ${language}`)
                            .setColor('#5e00ff')
                            .setDescription(`<@${user.id}> Tu peux poser ta question ou exposer ton problème ici.\n` +
                                "Les autres pourront ainsi t'aider le résoudre\n\n" +
                                "Tu peux commencer par sélectionner le langage :")

                        await channel_t.send(embed);
                        await obj.delete(key);
                    });
                });

                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                try {
                    console.log(userReactions.size)
                    for (const reaction of userReactions.values()) {
                        reaction.users.remove(user.id);
                    }
                    console.log(userReactions.size)
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }
            })

        }
    }
}