module.exports = {
    name: 'start',
    args: false,
    admin: true,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {
        const exec = message.member

        const embed = new Discord.MessageEmbed()
            .setTitle(":bellhop: Ouvrir une demande d'aide")
            .setColor('#5e00ff')
            .setDescription("Cliquez sur une réaction pour créer un channel dédié à votre problème.")

        const message_send = await message.channel.send(embed);

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

        for (const lr of language_reactions) {
            await message_send.react(lr);
        }
    }
}