const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
  //add firebase config here
};

const app = initializeApp(firebaseConfig);

function addWhitelistInfo(discordId, whitelistAddy) {
  const db = getDatabase();
  const reference = ref(db, "whitelist/" + discordId);

  set(reference, {
    whitelistAddress: whitelistAddy,
  });
}

function addAllowlistInfo(discordId, allowlistAddy) {
  const db = getDatabase();
  const reference = ref(db, "allowlist/" + discordId);

  set(reference, {
    allowlistAddress: allowlistAddy,
  });
}

function checkCollabWallet(wallet) {
  const db = getDatabase();
  const reference = ref(db, "dtc/");
}

module.exports = {
  addAllowlistInfo,
  addWhitelistInfo,
  getDatabase,
  ref,
  set,
  app,
  get,
  child,
};
