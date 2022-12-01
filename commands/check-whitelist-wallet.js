const { SlashCommandBuilder } = require("@discordjs/builders");
const { getDatabase, ref, get, child } = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-whitelisted-wallet")
    .setDescription("Check the wallet you entered"),
  async execute(interaction) {
    if (interaction.member.roles.cache.some((role) => role.name === "Marrer")) {
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      try {
        get(child(dbRef, `whitelist/${discordId}`)).then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            return await interaction.reply({
              content: data.whitelistAddress,
              ephemeral: true,
            });
          } else {
            return await interaction.reply({
              content: "You don't have a whitelisted wallet!",
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
