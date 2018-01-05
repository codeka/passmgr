import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DB } from "idb";
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
  private db: Promise<DB>;
  private siteStore: Promise<IDBObjectStore>;

  constructor() {
    this.db = idb.open("db", 1, (db) => {
      // Note: all these cases fall through
      switch (db.oldVersion) {
        case 0:
          db.createObjectStore("sites", {autoIncrement: true});
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
      .then((db) => {
        const tx = db.transaction(["sites"]);
        let siteInfos: SiteInfo[] = [];
        tx.objectStore("sites").iterateCursor((c) => {
          if (!c) {
            return;
          }

          siteInfos.push(c.value as UnencryptedInMemorySite);
          c.continue();
        });

        return tx.complete.then(() => siteInfos);
      });
  }

  /** Fetch the decrypted details of the given site. */
  getUnencryptedSite(key: number): Promise<UnencryptedInMemorySite> {
    // TODO
    return null;
  }
}