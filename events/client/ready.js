module.exports = {
    name: "ready",
    loaded: "true",

    execute: async (client, Discord) => {
        console.log('>>> Bread Bot is Online <<<');

        let i = 0;
        setInterval(() => {
            const status = [
                'dev with :two_hearts:',
                'En attente de vos demandes...',
                'XXX demandes effectuées.'
            ];

            client.user.setActivity(status[i]).then(() => {
                i = ++i % status.length;
            });
        }, 2000);
    }
}