module.exports = {
    name: 'code',
    args: true,
    admin: false,
    loaded: true,
    aliases: null,

    run: async (message, args, client, Discord) => {
        const exec = message.member

        const lang = args[0];
        const code = args.slice(args[0].length);


        message.channel.reply("lang: " + lang + " code:  " + code);




    }
}