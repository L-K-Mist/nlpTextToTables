// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

import PouchDB from "pouchdb-browser"
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('activityLog');




var crud = {
    info() {
        db.info().then(function (info) {
            console.log(info);
        });
    },
    getAll() {
        // get all items from storage including details
        return db.allDocs({
            include_docs: true
        })
            .then(db => {
                // re-map rows to collection of items
                return db.rows.map(row => {
                    return row.doc;
                });
            });
    },
    read(id) {
        // find item by id
        return db.get(id);
    },
    create(item) {
        // add or update an item depending on _id
        return db.put(item);
    },
    
    add(item) {
        // add new item 
        return this.db.post(item);
    },
    
    update(item) {
        // find item by id
        return this.db.get(item._id)
            .then(updatingItem => {
                // update item
                Object.assign(updatingItem, item);
                return this.db.put(updatingItem);
            });
    },
    
    remove(id) {
        // find item by id
        return this.db.get(id)
            .then(item => {
                // remove item
                return this.db.remove(item);
            });
    },
}


export default crud