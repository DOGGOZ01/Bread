module.exports = {
    name: 'start',
    args: false,
    admin: true,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {

        message.channel.send(":bellhop: Si vous avez besoin d'aide, ouvrez un ticket en cliquant sur la réaction :envelope_with_arrow:")


        const embed = new Discord.MessageEmbed()
            .setTitle("Créer un nouveau ticket")
            .setColor('#5e00ff')
            .setDescription("En réagissant ci-dessous vous pouvez créer un nouveau ticket d'aide")

        message.channel.send(embed).then(() => {
            message.react('📩');
        });

    }
}