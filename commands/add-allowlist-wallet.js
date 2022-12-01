const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  addAllowlistInfo,
  get,
  child,
  getDatabase,
  ref,
} = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-allowlist-wallet")
    .setDescription("Enter the wallet you would like to mint your allowlist on")
    .addStringOption((option) => {
      return option
        .setName("wallet")
        .setDescription("Wallet to add")
        .setRequired(true);
    }),
  async execute(interaction) {
    /* const lcWallets = allowlistWallets.map((wallet) => {
      wallet.toLowerCase();
    }); */
    if (
      interaction.member.roles.cache.some((role) => role.name === "Allowlist")
    ) {
      const wallet = interaction.options.getString("wallet");
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      try {
        get(child(dbRef, `allowlist/${discordId}`)).then(async (snapshot) => {
          if (snapshot.exists()) {
            return await interaction.reply({
              content: `Already added!`,
              ephemeral: true,
            });
          } else {
            addAllowlistInfo(discordId, wallet);
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
        content: "You're not allowlisted!",
        ephemeral: true,
      });
    }
  },
};
