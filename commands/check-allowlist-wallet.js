const { SlashCommandBuilder } = require("@discordjs/builders");
const { getDatabase, ref, get, child } = require("../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-allowlist-wallet")
    .setDescription("Check the wallet you entered for allowlist"),
  async execute(interaction) {
    if (
      interaction.member.roles.cache.some((role) => role.name === "Allowlist")
    ) {
      const discordId = interaction.user.id;
      const dbRef = ref(getDatabase());

      try {
        get(child(dbRef, `allowlist/${discordId}`)).then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            return await interaction.reply({
              content: data.allowlistAddress,
              ephemeral: true,
            });
          } else {
            return await interaction.reply({
              content: "You don't have an allowlisted wallet!",
              ephemeral: true,
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      await interaction.reply({
        content: "You're not on the allowlist!",
        ephemeral: true,
      });
    }
  },
};
