import PouchDB from "pouchdb-browser";
PouchDB.plugin(require("pouchdb-find"));

class Store {

    constructor(name) {
        this.db = new PouchDB(name);
    }

    getAll() {
        // get all items from storage including details
        return this.db.allDocs({
            include_docs: true
        })
            .then(db => {
                // re-map rows to collection of items
                return db.rows.map(row => {
                    return row.doc;
                });
            });
    }

    get(id) {
        // find item by id
        return this.db.get(id);
    }

    save(item) {
        // add or update an item depending on _id
        return item._id ?
            this.update(item) :
            this.add(item);
    }

    add(item) {
        // add new item 
        return this.db.post(item);
    }

    update(item) {
        // find item by id
        return this.db.get(item._id)
            .then(updatingItem => {
                // update item
                Object.assign(updatingItem, item);
                return this.db.put(updatingItem);
            });
    }

    remove(id) {
        // find item by id
        return this.db.get(id)
            .then(item => {
                // remove item
                return this.db.remove(item);
            });
    }
}

export default Store
/**
 * Then to Use:
 * 
 */