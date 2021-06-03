module.exports = {
    name: 'start',
    args: false,
    admin: true,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {

        const embed = new Discord.MessageEmbed()
            .setTitle(":bellhop: Créer un nouveau ticket")
            .setColor('#5e00ff')
            .setDescription("En réagissant ci-dessous vous pouvez créer un nouveau ticket d'aide")

        message.channel.send(embed).then(e => {
            e.react('📩');
        });

    }
}