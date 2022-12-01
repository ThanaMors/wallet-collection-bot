const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCJPbUfrnRQygkNARKtgipNu1UzuVEOSNs",
  authDomain: "whitelist-discord-bot-16236.firebaseapp.com",
  databaseURL:
    "https://whitelist-discord-bot-16236-default-rtdb.firebaseio.com",
  projectId: "whitelist-discord-bot-16236",
  storageBucket: "whitelist-discord-bot-16236.appspot.com",
  messagingSenderId: "448610442609",
  appId: "1:448610442609:web:4204cc92d293a58fa32ad0",
  measurementId: "G-7KNHDW5YRR",
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
