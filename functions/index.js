const functions = require('firebase-functions');
const admin =  require('firebase-admin');
const firebaseHelper =  require('firebase-functions-helper');
const express =  require('express');
const bodyParser =  require("body-parser");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const subjectCollection = 'subjects';
const cors = require("cors");

// Add new subject
app.use(cors({ origin: true }));
app.post('/subjects', (req, res) => {
    firebaseHelper.firestore
        .creatNewDocument(db, subjectCollection, req.body);
    res.send('Create a new subject');
})
// View all subject
app.get('/subjects', (req, res) => {
    firebaseHelper.firestore
        .backup(db, subjectCollection)
        .then(data => res.status(200).send(data))
})


main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter

module.exports = { webApi : functions.https.onRequest(main)};