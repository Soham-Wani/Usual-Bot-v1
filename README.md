# Usual Bot (v1)
This is a Node.js Discord bot designed to enhance your server experience by adding useful features and functionality. The bot is fully functional, offering basic moderation features such as kick and ban, as well as a few API integrations. While it lacks a command handler, it has been well-commented for developers to understand the code and use it when in need.

## Features
- **Moderation**: The bot offers basic moderation features such as kick and ban, making it easy to manage your server.
- **API integrations**: The bot includes a few API integrations, allowing you to retrieve information from external sources without leaving Discord.
- **Fully functional**: The bot is fully functional and can be easily added to any server with the appropriate permissions.

## Disclaimer
Please note that the bot does not support slash commands, which are mandatory for verified bots on Discord. As such, please proceed with caution when using this bot.

## Additional Information
Since the bot does not use a command handler, it requires a lot of RAM to operate. Additionally, it is not connected to a database, and its functionality is limited to basic moderation features. As this is a personal project and is not actively maintained, it may not function as expected and may have security vulnerabilities or other issues. Use at your own risk.

## Installation
To install the bot, you will need to have Node.js and npm installed on your machine. You can download them from the official website.

Once you have installed Node.js and npm, you can clone the repository from GitHub and navigate to the directory in your terminal. Then, run the following command to install the necessary dependencies:

After the dependencies have been installed, you will need to create a .env file in the root directory of the bot. The .env file should contain the following variables:

makefile
Copy code
DISCORD_TOKEN=<your Discord bot token>
PREFIX=<your desired command prefix>
Replace <your Discord bot token> with the token for your Discord bot, which can be obtained from the Discord Developer Portal. Replace <your desired command prefix> with the prefix that you want to use for your bot's commands.

Usage
To start the bot, run the following command in your terminal:

The bot should now be online and ready to use. You can invite the bot to your Discord server using the OAuth2 URL generated by the Discord Developer Portal.
