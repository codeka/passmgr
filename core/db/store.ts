import { IDBPDatabase, openDB } from "idb/with-async-ittr.js";
import "idb";

import { UnencryptedInMemorySite, SiteInfo } from "./model";

/**
 * The store, based on IndexedDB, that stores all our data.
 * 
 * https://developers.google.com/web/ilt/pwa/working-with-indexeddb
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 * https://github.com/jakearchibald/idb
 */
export class Store {
  private db: Promise<IDBPDatabase>;
  private siteStore: Promise<IDBObjectStore>;

  constructor() {
    this.db = openDB("db", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Note: all these cases fall through
        switch (oldVersion) {
          case 0:
            db.createObjectStore("sites", {autoIncrement: true});
        }
      }
    });
  }

  saveSite(site: UnencryptedInMemorySite): Promise<number> {
    return this.db
      .then((db) => {
        return db.transaction("sites", "readwrite")
          .objectStore("sites")
          .add(site)
      })
      .then((key) => {
        return key as number;
      });
  }

  listSites(): Promise<SiteInfo[]> {
    return this.db
      .then(async (db) => {
        const tx = db.transaction(["sites"]);
        let siteInfos: SiteInfo[] = [];
        for await (const c of tx.objectStore("sites")) {
          if (!c) {
            return [];
          }

          siteInfos.push(c.value as UnencryptedInMemorySite);
        }

        return siteInfos;
      });
  }

  /** Fetch the decrypted details of the given site. */
  getUnencryptedSite(key: number): Promise<UnencryptedInMemorySite> {
    // TODO
    return null;
  }
}