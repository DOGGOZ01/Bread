module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (reaction, user, client, Discord) => {
        const message = reaction.message;
        const reactions = message.reactions;
        const channel_id = reaction.message.channel.id;

        const everyone = message.guild.roles.cache.get(process.env.EVERYONE);
        //const etudiants = message.guild.roles.cache.get(process.env.ETUDIANT);
        const admins = message.guild.roles.cache.get(process.env.ADMIN);
        //const profs = message.guild.roles.cache.get(process.env.PROF);

        if (reaction.message.author === user) return;


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

        reactions.cache.forEach((value, key, obj) => {
            if (!language_reactions.includes(key) && key !== '❌') return;

            if (channel_id === process.env.CHANNEL_START) {
                reaction.users.remove(user);

                const language = value.emoji.name !== 'A_'? value.emoji.name : 'autre';

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
                                "Merci de respecter certaines règles :\n" +
                                "   - Enonce clairement ton problème\n" +
                                "   - Ajoute des morceaux de codes ou des images\n" +
                                "   - Ferme la demande d'aide une fois terminé en réagissant ci-dessous")

                        const message_send = await channel_t.send(embed);
                        message_send.react('❌');
                        await obj.delete(key);
                    });
                });

                removeUserReactions(message, user.id);
            }

            if (message.channel.parentID === process.env.CAT_OPEN) {

                message.channel.send(`<@${user.id}> A fermé cette demande d'aide il sera toujours disponible dans la catégorie Ticket fermé`).then(async () => {
                    let category = message.guild.channels.cache.get(process.env.CAT_CLOSE);
                    let channel = message.guild.channels.cache.get(value.message.channel.id)

                    await channel.setParent(category);
                    await channel.updateOverwrite(everyone, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: true,
                        ADD_REACTIONS: false,
                    });

                    await channel.updateOverwrite(admins, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: true,
                        ADD_REACTIONS: false
                    });


                    //await reaction.users.remove(user);

                    await message.reactions.removeAll();
                });

                //removeUserReactions(message, user.id);
            }
        });
    }
}

const removeUserReactions = (message, id) => {
    const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(id));
    try {
        for (const reaction of userReactions.values()) {
            reaction.users.remove(id);
        }
    } catch (error) {
        console.error('Failed to remove reactions.');
    }
}