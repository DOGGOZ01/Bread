module.exports = {
    name: "ready",
    loaded: "true",

    execute: async (client, Discord) => {
        console.log('>>> Bread Bot is Online <<<');

        await client.user.setActivity("attendre vos demandes d'aides...");

        // let i = 0;
        // setInterval(() => {
        //     const status = [
        //         'dev with :heart:',
        //         'im helping you',
        //         'to find dev solution'
        //     ];
        //
        //     client.user.setActivity(status[i]).then(() => {
        //         i = ++i % status.length;
        //     });
        // }, 2000);
    }
}