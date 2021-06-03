const prefix = process.env.PREFIX;

module.exports = {
    name: "message",
    loaded: true,

    execute: async (message, client, Discord) => {

        if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command_name = args.shift().toLowerCase();

        const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));
        if (!command) return;

        message.delete();

        if (command.admin && message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`[❌] <@${message.author.id}> Tu n'as pas la permission !`);

        if (command.args && !args.length) return message.channel.send(`[❌] <@${message.author.id}> Mauvaise utilisation de la commande !`);

        try {
            command.run(message, args, client, Discord);
        } catch (e) {
            console.error(e);
            await message.channel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`**${langF.embed_title}** \`${GUILD.prefix}${command.name}\``)
                .setDescription(`${message.author}, ${langF.command_error}`)
            );
        }
    }
}