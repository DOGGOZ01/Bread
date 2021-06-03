module.exports = {
    name: "messageReactionAdd",
    loaded: true,

    execute: async (messageReaction, user, client, Discord) => {

        const channel_id = messageReaction.message.channel.id;

        if (channel_id === '849817571456843787') {

            const userReactions = messageReaction.message.reactions.cache.filter(r => r.users.cache.has(user.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(user.id);
                }
            } catch (e) {
                console.error(e);
            }

            

        }
    }
}