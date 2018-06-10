// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

import PouchDB from "pouchdb-browser"
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('activityLog');


db.info().then(function (info) {
    console.log(info);
})


export default db