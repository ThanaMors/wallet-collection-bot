const { SlashCommandBuilder } = require("@discordjs/builders");
const { getDatabase, ref, get, child } = require("./firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-wallet")
    .setDescription("Enter the wallet you would like to check")
    .addStringOption((option) => {
      return option
        .setName("wallet")
        .setDescription("Wallet to check")
        .setRequired(true);
    }),
  async execute(interaction) {},
};
