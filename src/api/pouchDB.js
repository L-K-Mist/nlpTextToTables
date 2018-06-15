// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

/** #Reasearch Object.assign
 * Object.assign(target, ...sources)
 * 
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
 */

import PouchDB from "pouchdb-browser"
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('activityLog');

//TODO: Turn some of these into buttons on the rows



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
        return db.get(item._id)
            .then(updatingItem => {
                // update item
                Object.assign(updatingItem, item); // #Research
                return this.db.put(updatingItem);
            });
    },
    
    remove(id) {
        // find item by id
        return db.get(id)
            .then(item => {
                // remove item
                return db.remove(item);
            });
    },
}


export default crud