//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
//TD5: suggest, report, bug
//TD?: Reply pings
//TDV: SWITCH FOR REPLY AND CHANNEL.SEND
//TD6: impppp Edit error for invalid user in kick and timeout ban unban
//TD7: Add remove timeout and unban
//TD8: MUSIC, GAW
const mySecret = process.env['DISCORD_TOKEN'];
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILD_MESSAGES", "GUILDS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"],
    partials: ['CHANNEL']
});
var _0x874b = ["\x66\x75\x63\x6B", "\x64\x69\x63\x6B", "\x61\x73\x73", "\x62\x69\x74\x63\x68", "\x77\x61\x6E\x6B", "\x70\x75\x73\x73\x79", "\x63\x75\x6E\x74", "\x6E\x69\x67\x67\x65\x72", "\x6E\x69\x67\x67\x61", "\x74\x69\x74\x74\x69\x65\x73", "\x74\x69\x64\x64\x69\x65\x73", "\x63\x6F\x63\x6B", "\x62\x6F\x6E\x65\x72", "\x63\x75\x6D", "\x62\x75\x6D", "\x73\x65\x78", "\x7A\x68\x61\x74\x75", "\x7A\x68\x61\x76", "\x6C\x61\x75\x64\x79\x61", "\x6C\x61\x76\x64\x79\x61", "\x62\x6F\x6F\x62", "\x70\x65\x6E\x69\x73", "\x76\x61\x67\x69\x6E\x61", "\x67\x61\x6E\x64", "\x63\x68\x6F\x74", "\x63\x68\x75\x74", "\x62\x68\x6F\x73\x61\x64", "\x70\x6F\x72\x6E", "\x63\x69\x62\x61\x69", "\x73\x74\x66\x75", "\x77\x74\x66", "\x77\x68\x6F\x72\x65", "\x76\x69\x72\x67\x69\x6E", "\x62\x75\x74\x74", "\x73\x75\x63\x6B\x65\x72", "\x61\x6E\x61\x6C", "\x70\x65\x64\x6F", "\x67\x61\x79", "\x6C\x65\x73\x62\x69\x61\x6E", "\x6C\x65\x73\x62\x6F", "\x63\x68\x6F\x64", "\x6D\x61\x64\x61\x72"];
let blacklisted = [_0x874b[0], _0x874b[1], _0x874b[2], _0x874b[3], _0x874b[4], _0x874b[5], _0x874b[6], _0x874b[7], _0x874b[8], _0x874b[9], _0x874b[10], _0x874b[11], _0x874b[12], _0x874b[13], _0x874b[14], _0x874b[15], _0x874b[16], _0x874b[17], _0x874b[18], _0x874b[19], _0x874b[20], _0x874b[21], _0x874b[22], _0x874b[23], _0x874b[24], _0x874b[25], _0x874b[26], _0x874b[27], _0x874b[28], _0x874b[29], _0x874b[30], _0x874b[31], _0x874b[32], _0x874b[33], _0x874b[34], _0x874b[35], _0x874b[36], _0x874b[37], _0x874b[38], _0x874b[39], _0x874b[40], _0x874b[41]]
const keep_alive = require('./keep_alive.js');
const {
    MessageEmbed
} = require('discord.js');
let prefix = ",";
let me = '912297357339660309';
const cooldown = new Set();
client.on('ready', () => {
    console.log('Live! Yay!');
    client.user.setActivity("For ,info", {
        type: "WATCHING"
    });
});
client.login(process.env.DISCORD_TOKEN);
process.on('unhandledRejection', error => {
    console.error(`${error}`);
});
client.on("guildMemberAdd", async member => {
    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.displayName + `__ joined the server`).then(member.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(`Welcome ${member}! Hope you enjoy!`));
});
/* Bad words */
client.on("message", async message => {
    const user = message.author;
    let foundInText = false;
    if (message.author.bot) return;
    if (message.content.length < 17) {
        for (var i in blacklisted) {
            if (message.content.toLowerCase().replace(/[^a-z]/g, "").replace(/ /g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
    } else if (message.content.length >= 17) {
        for (var i in blacklisted) {
            if (message.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
    }
    if (message.content.includes('🖕')) foundInText = true;
    if (message.content.toLowerCase().includes('pass') || message.content.toLowerCase().includes('g and') || message.content.toLowerCase().includes('as s') || message.content.toLowerCase().includes('wassup')) foundInText = false;
    if (foundInText === true && message.channel.type !== 'DM' && !message.channel.nsfw) {
        message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
        console.log(message.content, message.author);
        if (message.author.id !== client.user.id) {
            message.channel.send(`${user} You can't send that here!`);
        }
        if (!message.author.bot) {
            message.author.send(`You can be banned for using bad or profane words or emojis on servers. Don\'t use them, ever!`);
        }
    } else if (foundInText === true && message.channel.type == 'DM') {
        message.channel.send(`You will abuse me personally now?\nಠ﹏ಠ`)
    }
    /* No DMs */
    else if (message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && !message.content.startsWith(prefix)) {
        message.channel.send("I can\'t talk to everyone on DMs. Please get on a Discord server to talk to me!")
    } else if (message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && message.content.startsWith(prefix)) {
        message.channel.send("You can't use commands in DMs. Please get on a Discord server to use commands!")
    }
});
client.on("message", async message => {
    /* No Promotion */
    if (message.content.includes('discord.')) {
        if (!message.member.permissions.has("ADMINISTRATOR") && !(message.channel.name.includes("promot") || message.channel.name.includes("advertise")) && message.channel.type !== 'DM') {
            message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
            message.channel.send(`${message.author} Nah! You can't promote here!`);
        }
    }
    /* Stats */
    else if (message.author.id == me && message.content == `${prefix}stats` && message.channel.type !== 'DM') {
        message.channel.send({
            embeds: [
                new MessageEmbed().setColor('#0000ff').setDescription(client.guilds.cache.map(g => `Guild Name: ${g.name}\nTotal Members: ${g.members.cache.size}\nGuild ID: ${g.id}`).join('\n\n'))
            ]
        });
        client.users.fetch('912297357339660309', false).then((dev) => {
            dev.send('hello world');
        });
    } else if (message.author.id !== me && message.content == `${prefix}stats` && message.channel.type !== 'DM') {
        message.reply('You thought you are a dev? Lol! Only devs can use this command');
    }
    /* General */
    else if (message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot && !message.content.startsWith(`${prefix}`)) {
        if (message.content.toLowerCase() == "hi" || message.content.toLowerCase() == "hello" || message.content.toLowerCase() == "hello!" || message.content.toLowerCase() == "hi!" || message.content.toLowerCase() == "hey!" || message.content.toLowerCase() == "hey" || message.content.toLowerCase() == "heya!" || message.content.toLowerCase() == "heya" || message.content.toLowerCase() == "namaste" || message.content.toLowerCase() == "hola" || message.content.toLowerCase() == "hola!" || message.content.toLowerCase() == "namaste!") {
            message.reply(`Hello!`)
        } else if (message.content.toLowerCase() == "yo" || message.content.toLowerCase() == "sup") {
            message.reply(`Sup?`)
        } else if (message.content.toLowerCase().startsWith("ping")) {
            message.reply(`Pong!`)
        } else if (message.content.toLowerCase().startsWith("pong")) {
            message.reply(`Ping!`)
        } else if (message.content.toLowerCase().includes("bruh")) {
            message.reply(`Big Bruh Momento`)
        } else if (message.content.toLowerCase().includes("haha") || message.content.toLowerCase().includes("huehue") || message.content.toLowerCase().includes("lol")) {
            message.reply(`Lol!`)
        } else if (message.content.toLowerCase().includes("bye")) {
            message.reply(`Bye!`)
        } else if (message.content.toLowerCase() === `i hate you`) {
            message.reply(`Sorry but I consider my haters, my motivators!`)
        } else if (message.content.toLowerCase().includes(`are you mad`)) {
            message.reply(`Nah bro! I am not you!`)
        } else if (message.content.toLowerCase().includes("yee") || message.content.toLowerCase().includes("wee")) {
            message.reply(`stop`)
        }
    }
    /* Commands */
    else if (message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot || message.content.startsWith(prefix)) {
        //wrong
        if (message.content.startsWith(`${prefix} `)) {
            message.reply(`Please type a valid command!`)
        }
        //help
        else if (message.content.toLowerCase() === `${prefix}help`) {
            const helpEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Help (${prefix}help)`).setDescription(`**Current list of commands:\n\nGeneral** \n${prefix}help\n${prefix}info\n${prefix}spam\n\n**For admins:**\n${prefix}ban\n${prefix}clean\n${prefix}delete\n${prefix}kick\n${prefix}timeout`);
            message.reply({
                embeds: [helpEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //info
        else if (message.content.toLowerCase() === `${prefix}info`) {
            const infoEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Info (${prefix}info)`).setDescription(`I am currently a basic Discord bot, but I will soon come up with jokes, facts and much more! Type __${prefix}help__ to get a list of commands. \n\n**Features:**\n• Easy to understand.\n• Wide variety of innovative commands.\n• Hassle free moderation.\n• Deletes bad or profane words.\n• Never kicks, bans or timeouts members on its own.\nMore exciting features yet to come...\n\n**Credits:**\nDeveloper and owner: Pseudonymous123#5921`);
            message.reply({
                embeds: [infoEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //spam
        else if (message.content.toLowerCase().startsWith(`${prefix}spam`) && message.author.id !== me && !message.content.includes('@') && message.channel.name.includes("spam") && message.content !== `${prefix}spam`) {
            const args = message.content.split(" ");
            if (args[0] == `${prefix}spam`) {
                if (cooldown.has(message.author.id)) return message.reply(`Slow down bud! You can use this command after 2 minutes!`);
                if (!args[1]) return message.reply(`Please type a number. Type __${prefix}spam__ to know more.`);
                if (isNaN(args[1])) return message.reply(`Please type a number. Type __${prefix}spam__ to know more.`);
                if (args[1] > 20) return message.reply(`Please type realistic numbers (<20). Type __${prefix}spam__ to know more.`);
                if (!args[2]) return message.reply(`Also include what should I spam. Type __${prefix}spam__ to know more.`);
                const amountOfMessages = args[1];
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                for (let i = 0; i < amountOfMessages; i++) {
                    message.channel.send(messageToSend);
                }
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, 2 * 60 * 1000);
            }
        } else if (message.content.toLowerCase().startsWith(`${prefix}spam`) && message.author.id == me && message.channel.name.includes("spam") && message.content !== `${prefix}spam`) {
            const args = message.content.split(" ");
            if (args[0] == `${prefix}spam`) {
                if (!args[1]) return message.reply(`Please type a number. Type __${prefix}spam__ to know more.`);
                if (isNaN(args[1])) return message.reply(`Please type a number. Type __${prefix}spam__ to know more.`);
                if (args[1] > 20) return message.reply(`Please type realistic numbers (<20). Type __${prefix}spam__ to know more.`);
                if (!args[2]) return message.reply(`Also include what should I spam. Type __${prefix}spam__ to know more.`);
                const amountOfMessages = args[1];
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                for (let i = 0; i < amountOfMessages; i++) {
                    message.channel.send(messageToSend);
                }
            }
        } else if (message.content.toLowerCase().startsWith(`${prefix}spam`) && message.author.id !== me && message.content.includes('@') && message.channel.name.includes("spam")) {
            message.reply('Haha, nice try!')
        } else if (message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.channel.name.includes("spam")) {
            message.reply(`Nah! You can't spam here!`)
        } else if (message.channel.name.includes("spam") && message.content == `${prefix}spam`) {
            const spamEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Spam (${prefix}spam)`).setDescription(`Using the ${prefix}spam command correctly will spam any message upto 20 times.\n\nTyping __${prefix}spam 10 hello__ will spam 10 hellos.`);
            message.reply({
                embeds: [spamEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //clean
        else if (message.content.toLowerCase() == `${prefix}clean links` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
            const Channel = message.channel;
            const Messages = await Channel.messages.fetch({
                limit: 100
            });
            Messages.forEach(msg => {
                if (msg.content.includes('discord.gg') || msg.content.includes('http') || msg.content.includes('discordapp.com/invite/')) {
                    if (!msg.member.permissions.has("ADMINISTRATOR") && !(msg.channel.name.includes("promot") || msg.channel.name.includes("advertise")) && msg.channel.type !== 'DM') {
                        msg.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                    }
                }
            });
            message.channel.send("Previous 100 messages have been cleaned!");
        } else if (message.content == `${prefix}clean words` && !message.author.bot && !message.channel.nsfw && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
            const Channel = message.channel;
            const Messages = await Channel.messages.fetch({
                limit: 100
            });
            Messages.forEach(msg => {
                for (var i in blacklisted) {
                    if (msg.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) {
                        msg.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                    }
                }
            });
            message.channel.send("Previous 100 messages have been cleaned!");
        } else if (message.content.toLowerCase() === `${prefix}clean` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
            const cleanEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Clean (${prefix}clean)`).setDescription(`Using this command, administrators can easily clean previous messages making them free from bad words or unwanted links sent by members other than the admin. \n\nTyping __${prefix}clean links__ will delete all links from previous 100 messages except for the ones sent by the admin.\nTyping __${prefix}clean words__ will delete all bad words from previous 100 messages.`);
            message.reply({
                embeds: [cleanEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        } else if (message.content.toLowerCase().startsWith(`${prefix}clean`) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("You can't do that. You need Administrator permissions!")
        }
        //delete
        else if (message.content.toLowerCase().startsWith(`${prefix}delete`) && message.content.toLowerCase() !== `${prefix}delete` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
            const Channel = message.channel;
            const args = message.content.split(" ");
            if (args[1] > 100 || isNaN(args[1])) return message.reply(`Please type realistic numbers \(<100\) or a number atleast. Type __${prefix}delete__ to know more.`);
            if (args[1] == 1) return message.reply(`Come on! You really want me to delete a single message?`);
            const Messages = await Channel.messages.fetch({
                limit: args[1]
            }).then(fetched => {
                const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                message.channel.bulkDelete(notPinned, true);
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
            message.channel.send(`Previous ${args[1]} messages have been deleted!`);
            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__${args[1]}__ messages deleted from __<#${message.channel.id}>__ by __` + message.author.displayName + `__`);
        } else if (message.content.toLowerCase() === `${prefix}delete` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
            const deleteEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Delete (${prefix}delete)`).setDescription(`Using this command, administrators can easily delete upto 100 previous messages for any reason (I won't judge!)\n\nTyping __${prefix}delete 20__ will delete 20 previous messages`);
            message.reply({
                embeds: [deleteEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        } else if (message.content.toLowerCase().startsWith(`${prefix}delete`) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("You can't do that. You need Administrator permissions!")
        }
        //ban
        else if (message.content.toLowerCase().startsWith(`${prefix}ban`) && message.content.includes('@') && message.content !== `${prefix}ban` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id !== me) {
            const args = message.content.split(" ");
            if (args[0] == `${prefix}ban`) {
                if (!args[2]) return message.reply(`Please include a valid reason. Type __${prefix}ban__ to know more.`);
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                var member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.reply(`Bye Bye! __` + member.displayName + `__ has been successfully banned!`).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Ban Members `."));
                    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.displayName + `__ has been banned from the server by __` + message.author.displayName + `__ for __` + messageToSend + `__`);
                });
            }
        } else if (message.content.toLowerCase().startsWith(`${prefix}ban`) && !message.content.includes('@') && message.content !== `${prefix}ban` && message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Please include a valid user Type __${prefix}ban__ to know more.`)
        } else if (message.content.toLowerCase() == `${prefix}ban` && message.member.permissions.has("ADMINISTRATOR")) {
            const banEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Ban (${prefix}ban)`).setDescription(`Using the ${prefix}ban command allows people with Administrator permissions to ban members easily.\n\nTyping __${prefix}ban @person reason__ will ban that person for mentioned reason.`);
            message.reply({
                embeds: [banEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        } else if (message.content.toLowerCase().startsWith(`${prefix}ban`) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("You thought you could do that? You need Administrator permissions lol!")
        } else if (message.content.toLowerCase().startsWith(`${prefix}ban`) && message.content.includes('@') && message.content !== `${prefix}ban` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id == me) {
            message.reply("I can't betray my master!")
        }
        //kick
        else if (message.content.toLowerCase().startsWith(`${prefix}kick`) && message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id !== me && message.mentions.members.first().id !== null) {
            const args = message.content.split(" ");
            if (args[0] == `${prefix}kick`) {
                if (!args[2]) return message.reply(`Please include a valid reason. Type __${prefix}kick__ to know more.`);
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                var member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.reply(`Bye Bye! __` + member.displayName + `__ has been successfully kicked!`).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Kick Members `."));
                    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.displayName + `__ has been kicked from the server by __` + message.author.displayName + `__ for __` + messageToSend + `__`);
                });
            }
        } else if (message.content.toLowerCase().startsWith(`${prefix}kick`) && !message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Please include a valid user Type __${prefix}kick__ to know more.`)
        } else if (message.content.toLowerCase() == `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
            const kickEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Kick (${prefix}kick)`).setDescription(`Using the ${prefix}kick command allows people with Administrator permissions to kick members easily.\n\nTyping __${prefix}kick @person reason__ will kick that person for mentioned reason.`);
            message.reply({
                embeds: [kickEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        } else if (message.content.toLowerCase().startsWith(`${prefix}kick`) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("You thought you could do that? You need Administrator permissions lol!")
        } else if (message.content.toLowerCase().startsWith(`${prefix}kick`) && message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id == me) {
            message.reply("I can't betray my master!")
        }
        //timeout
        else if (message.content.toLowerCase().startsWith(`${prefix}timeout`) && message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id !== me) {
            const args = message.content.split(" ");
            if (args[0] == `${prefix}timeout`) {
                if (isNaN(args[2]) || !args[2]) return message.reply(`Please include a valid time period. Type __${prefix}timeout__ to know more.`);
                if (!args[3]) return message.reply(`Please include a valid reason. Type __${prefix}timeout__ to know more.`);
                let time = args[2] * 60 * 1000;
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                var member = message.mentions.members.first();
                member.timeout(time, messageToSend).then((member) => {
                    message.reply(`Bye Bye! __${member}__ has been successfully timedout!`).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Timeout Members `."));
                    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.displayName + `__ has been timedout from the server by __` + message.author.displayName + `__ for __` + messageToSend + `__`);
                });
            }
        } else if (message.content.toLowerCase().startsWith(`${prefix}timeout`) && !message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Please include whom to timeout? Type __${prefix}timeout__ to know more.`)
        } else if (message.content.toLowerCase() == `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
            const timeoutEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Timeout (${prefix}timeout)`).setDescription(`Using the ${prefix}timeout command allows people with Administrator permissions to timeout members easily.\n\nTyping __${prefix}timeout @person time reason__ will timeout that person for mentioned time (in minutes) for mentioned reason.`);
            message.reply({
                embeds: [timeoutEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        } else if (message.content.toLowerCase().startsWith(`${prefix}timeout`) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.reply("You thought you could do that? You need Administrator permissions lol!")
        } else if (message.content.toLowerCase().startsWith(`${prefix}timeout`) && message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.me) {
            message.reply("I can't betray my master!")
        }
    }
});