module.exports = {
    name: 'clear',
    args: true,
    admin: false,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {
        const exec = message.member



        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply("Tu n'as pas la permission de faire ça");
        }

        const reason = args.slice(0).join(' ')
        if (!reason) {
            message.reply("Indique le nombre de messages que tu souhaite supprimer.");
        }

        const deleteCount = parseInt(args[0], 10);

        if (deleteCount > 99 || deleteCount < 1){
            message.channel.send("<@" + exec + ">" + " mets un nombre entre 1 et 99")
        }

        message.delete()
        message.channel.bulkDelete(deleteCount);

        message.channel.send("<@" + exec + ">" + " vient de supprimer: " + deleteCount + " messages");
    }
}