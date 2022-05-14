import * as admin from "firebase-admin";

const connection = require("../../firebase-admin.json");

// Initialize Firebase if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(connection),
  });
}

const db = admin.apps[0]!.firestore();
export default db;
