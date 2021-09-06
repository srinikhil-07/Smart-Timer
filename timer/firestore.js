'use strict';

// [START bookshelf_firestore_client]
const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const collection = 'Session';
// [END bookshelf_firestore_client]

// Creates a new book or updates an existing book with new data.
async function update(id, data) {
    let ref;
    if (id === null) {
        ref = db.collection(collection).doc();
    } else {
        ref = db.collection(collection).doc(id);
    }

    data.id = ref.id;
    data = {...data };
    await ref.set(data);
    return data;
}

async function create(data) {
    return await update(null, data);
}
module.exports = {
    create,
    update,
};