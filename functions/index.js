const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();


admin.initializeApp({
  credential: admin.credential.cert("./credentials.json"),
  databaseURL: "https://endpoint-5f075.firebaseio.com",
});

const db= admin.firestore();


app.post("/api/users", async (req, res) => {
    try {
      await db
        .collection("users")
        .doc("/" + req.body.id + "/")
        .create({ name: req.body.name, telefono: req.body.telefono });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  });

app.get("/api/users/:users_id", (req, res) => {
    (async () => {
      try {
        const doc = db.collection("users").doc(req.params.users_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).send(response);
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  });

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
