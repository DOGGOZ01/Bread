module.exports = {
    name: 'start',
    args: false,
    admin: true,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {

        const embed = new Discord.MessageEmbed()
            .setTitle(":bellhop: Ouvrir une demande d'aide")
            .setColor('#5e00ff')
            .setDescription("Cliquez sur la réaction pour créer un channel dédié à votre problème.")

        message.channel.send(embed).then(e => {
            e.react('📩');
        });

    }
}