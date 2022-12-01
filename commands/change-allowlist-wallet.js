const { SlashCommandBuilder } = require("@discordjs/builders");
const { getDatabase, ref, set, child, get } = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change-allowlist-wallet")
    .setDescription(
      "Change the wallet you would like to mint your allowlist on"
    )
    .addStringOption((option) => {
      return option
        .setName("wallet")
        .setDescription("Wallet to change")
        .setRequired(true);
    }),
  async execute(interaction) {
    if (
      interaction.member.roles.cache.some((role) => role.name === "Allowlist")
    ) {
      const wallet = interaction.options.getString("wallet");
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      get(child(dbRef, `allowlist/${discordId}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          set(child(dbRef, `allowlist/${discordId}`), {
            allowlistAddress: wallet,
          })
            .then(async (snapshot) => {
              return await interaction.reply({
                content: `Changed wallet to ${wallet}`,
                ephemeral: true,
              });
            })
            .catch((e) => console.error(e));
        } else {
          return await interaction.reply({
            content: `You don't have a wallet added!`,
            ephemeral: true,
          });
        }
      });
    } else {
      await interaction.reply({
        content: "You're not allowlisted!",
        ephemeral: true,
      });
    }
  },
};
