'use strict';

// [START bookshelf_firestore_client]
const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const collection = 'Session';
// [END bookshelf_firestore_client]

// Creates a new book or updates an existing book with new data.
async function update(userId, id, data) {
    let ref;
    if (id === null) {
        ref = db.collection(collection).doc(userId).collection(collection).doc();
    } else {
        ref = db.collection(collection).doc(userId).collection(collection).doc(id);
    }
    data.id = ref.id;
    data = {...data };
    await ref.set(data);
    return data;
}

async function create(userId, data) {
    return await update(userId, null, data);
}
module.exports = {
    create,
    update,
};
//from vscode.dev