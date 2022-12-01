const { SlashCommandBuilder } = require("@discordjs/builders");
const { getDatabase, ref, set, child, get } = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change-whitelist-wallet")
    .setDescription(
      "Change the wallet you would like to mint your whitelist on"
    )
    .addStringOption((option) => {
      return option
        .setName("wallet")
        .setDescription("Wallet to change")
        .setRequired(true);
    }),
  async execute(interaction) {
    if (interaction.member.roles.cache.some((role) => role.name === "Marrer")) {
      const wallet = interaction.options.getString("wallet");
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      get(child(dbRef, `whitelist/${discordId}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          set(child(dbRef, `whitelist/${discordId}`), {
            whitelistAddress: wallet,
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
        content: "You're not whitelisted!",
        ephemeral: true,
      });
    }
  },
};
