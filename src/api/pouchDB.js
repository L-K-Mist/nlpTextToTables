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
  deleteAll() {
    db.allDocs({
      include_docs: true
    }).then(allDocs => {
      return allDocs.rows.map(row => {
        return {
          _id: row.id,
          _rev: row.doc._rev,
          _deleted: true
        };
      });
    }).then(deleteDocs => {
      return db.bulkDocs(deleteDocs);
    });
  },
  deleteAllType(type) {
    db.allDocs({
      include_docs: true,
      startkey: type,
      endkey: type + '\uffff'
    }).then(allDocs => {
      return allDocs.rows.map(row => {
        return {
          _id: row.id,
          _rev: row.doc._rev,
          _deleted: true
        };
      });
    }).then(deleteDocs => {
      return db.bulkDocs(deleteDocs);
    });
  },
  getAllType(type) {
    return db.allDocs({
      include_docs: true,
      startkey: type,
      endkey: type + '\uffff'
    }).then(result => {
      // re-map rows to collection of items
      return result.rows.map(row => { //drills down the objects in the array to pull out the data at the doc. level
        return row.doc;
      });
    })
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



/**
 * Use and abuse your doc IDs
For a more elaborate example, let's imagine you're writing a music app. Your database might contain artists:

[ { _id: 'artist_bowie',
    type: 'artist',
    name: 'David Bowie',
    age: 67 },
  { _id: 'artist_dylan',
    type: 'artist',
    name: 'Bob Dylan',
    age: 72 },
  { _id: 'artist_joni',
    type: 'artist',
    name: 'Joni Mitchell',
    age: 70 } ]
… as well as albums:

[ { _id: 'album_bowie_1971_hunky_dory',
    artist: 'artist_bowie',
    title: 'Hunky Dory',
    type: 'album',
    year: 1971 },
  { _id: 'album_bowie_1972_ziggy_stardust',
    artist: 'artist_bowie',
    title: 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars',
    type: 'album',
    year: 1972 },
  { _id: 'album_dylan_1964_times_they_are_changin',
    artist: 'artist_dylan',
    title: 'The Times They Are a-Changin\'',
    type: 'album',
    year: 1964 },
  { _id: 'album_dylan_1965_highway_61',
    artist: 'artist_dylan',
    title: 'Highway 61 Revisited',
    type: 'album',
    year: 1965 },
  { _id: 'album_dylan_1969_nashville_skyline',
    artist: 'artist_dylan',
    title: 'Nashville Skyline',
    type: 'album',
    year: 1969 },
  { _id: 'album_joni_1974_court_and_spark',
    artist: 'artist_joni',
    title: 'Court and Spark',
    type: 'album',
    year: 1974 } ]
See what I did there? Artist-type documents are prefixed with 'artist_', and album-type documents are prefixed with 'album_'. This naming scheme is clever enough that we can already do lots of complex queries using allDocs(), even though we're storing two different types of documents.

Want to find all artists? It's just:

allDocs({startkey: 'artist_', endkey: 'artist_\uffff'});
Want to list all the albums? Try:

allDocs({startkey: 'album_', endkey: 'album_\uffff'});
How about all albums by David Bowie? Wham bam, thank you ma'am:

allDocs({startkey: 'album_bowie_', endkey: 'album_bowie_\uffff'});
Let's go even fancier. Can we find all of Bob Dylan's albums released between 1964 and 1965, in reverse order? Gather 'round people, and try this:

allDocs({startkey: 'album_dylan_1965_', endkey: 'album_dylan_1964_\uffff', descending: true});
In this example, you're getting all those "indexes" for free, each time a document is added to the database. It doesn't take up any additional space on disk compared to the randomly-generated UUIDs, and you don't have to wait for a view to get built up, nor do you have to understand the map/reduce API at all.

Of course, this system starts to get shaky when you need to search by a variety of criteria: e.g. all albums sorted by year, artists sorted by age, etc. And you can only sort strings – not numbers, booleans, arrays, or arbitrary JSON objects, like the map/reduce API supports. But for a lot of simple applications, you can get by without using the query() API at all.

Performance tip: if you're just using the randomly-generated doc IDs, then you're not only missing out on an opportunity to get a free index – you're also incurring the overhead of building an index you're never going to use. So use and abuse your doc IDs!
 * 
 */
export default crud
