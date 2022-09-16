import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const transaction = jateDB.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const request = store.put({ jate: content });
  const result = await request;
  console.log("data saved to jate database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get all from database");
  const jateDB = await openDB("jate", 1);
  const transaction = jateDB.transaction("jate", "readonly");
  const store = transaction.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log(result);
};

initdb();
