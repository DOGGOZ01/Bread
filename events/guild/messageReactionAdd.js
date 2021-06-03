module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (reaction, user, client, Discord) => {
        const message = reaction.message;
        const reactions = message.reactions;
        const channel_id = reaction.message.channel.id;

        const everyone = message.guild.roles.cache.get(process.env.CAT_OPEN);

        if (!reaction.partial) return;


        const language_reactions = [
            '849947825173037056',
            '849947825068048444',
            '849947825117593620',
            '849947825026629693',
            '849947825227300874',
            '849947825105535036',
            '849947825043013642',
            '849947825043537940',
            '🅰️'
        ];


        if (channel_id === process.env.CHANNEL_START) {
            /* Remove Automatically User Reactions */
            await reaction.users.remove(user);
            message.guild.channels.create(`ticket ${user.username}`, {type: 'text'}).then(async channel => {
                let category = message.guild.channels.cache.get('849823383507697734');
                await channel.setParent(category);

                channel.updateOverwrite(everyone, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                }).then(async channel_t => {

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Ticket de demande d'aide")
                        .setColor('#5e00ff')
                        .setDescription(`<@${user.id}> Tu peux poser ta question ou exposer ton problème ici.\n` +
                            "Les autres pourront ainsi t'aider le résoudre\n\n" +
                            "Tu peux commencer par sélectionner le langage :")

                    const message_send = await channel_t.send(embed);
                    for (const lr of language_reactions) {
                        console.log(lr)
                        await message_send.react(lr);
                    }
                });
            });
        }





    }
}