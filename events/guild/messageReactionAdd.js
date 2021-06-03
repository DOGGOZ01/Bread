module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (messageReaction, user, client, Discord) => {

        const channel_id = messageReaction.message.channel.id;

        console.log(channel_id)

    }
}