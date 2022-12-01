const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  addWhitelistInfo,
  getDatabase,
  ref,
  get,
  child,
} = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-whitelist-wallet")
    .setDescription("Enter the wallet you would like to mint your whitelist on")
    .addStringOption((option) => {
      return option
        .setName("wallet")
        .setDescription("Wallet to add")
        .setRequired(true);
    }),
  async execute(interaction) {
    /* const lcWallets = whitelistWallets.map((wallet) => {
      wallet.toLowerCase();
    }); */
    if (interaction.member.roles.cache.some((role) => role.name === "Marrer")) {
      const wallet = interaction.options.getString("wallet");
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      try {
        get(child(dbRef, `whitelist/${discordId}`)).then(async (snapshot) => {
          if (snapshot.exists()) {
            return await interaction.reply({
              content: `Already added!`,
              ephemeral: true,
            });
          } else {
            addWhitelistInfo(discordId, wallet);
            await interaction.reply({
              content: `Added ${wallet}`,
              ephemeral: true,
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      await interaction.reply({
        content: "You're not whitelisted!",
        ephemeral: true,
      });
    }
  },
};
