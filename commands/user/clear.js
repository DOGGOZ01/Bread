module.exports = {
    name: 'clear',
    args: true,
    admin: false,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {
        const exec = message.member

        message.delete()

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply("Tu n'as pas la permission de faire ça");
        }

        const reason = args.slice(0).join(' ')
        if (!reason) {
            message.reply("Indique le nombre de messages que tu souhaite supprimer.");
        }

        const deleteCount = parseInt(reason, 10);

        if (deleteCount < 1 || deleteCount > 100) return message.reply("Tu peux pas supp + de 99 msg en 1 fois.")

        message.channel.bulkDelete(deleteCount + 1).catch(error => message.reply(`Erreur: ${error}`));

        message.channel.send("<@" + exec + ">" + " vient de supprimer: " + reason + " messages");
    }
}