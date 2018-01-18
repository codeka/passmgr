
// Number of rounds to use when deriving the key from the user's password. Changing this number will
// make all encrypted blobs un-decryptable. On my desktop, this takes about 300ms, which seems OK.
const KEY_DERIVATION_NUM_ROUNDS = 500000;

// The salt used when deriving keys from user-generated passwords. Just a random string that cannot
// change.
const KEY_DERIVATION_SALT = new TextEncoder().encode("hdsfi87YI7dfij76gdfj&DGSFUK6dgfjkugj").buffer;

/**
 * A wrapper around window.crypto.subtle that we use to encrypt stuff, generate keys, etc.
 */
export class Crypto {
  /** Returns a promise with the key derived from the given master password. */
  public static deriveKey(masterPassword: string): PromiseLike<CryptoKey> {
    const masterPasswordBuffer = new TextEncoder().encode(masterPassword).buffer;
    return crypto.subtle.importKey(
      "raw", masterPasswordBuffer, { name: "PBKDF2" }, false, ["deriveKey"])
      .then((key) => {
        return crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: KEY_DERIVATION_SALT,
            iterations: KEY_DERIVATION_NUM_ROUNDS,
            hash: 'SHA-256'
          },
          key,
          { name: "AES-CBC", length: 256 },
          false,
          [ "encrypt", "decrypt" ]
        );
      });
  }

  /** Encrypt the given JSON object with the given key (returned from {@link #deriveKey}). */
  public static encrypt(key: CryptoKey, json: any): Promise<Uint8Array> {
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);

    // The plaintext is actually the JSON-encoded version of the object. This allows us to ensure
    // that the object at least decrypts to a valid JSON object in #decrypt, as a quick sort of
    // validation step.
    const plaintext = Uint8Array.from(new TextEncoder().encode(JSON.stringify(json)));;

    return new Promise((resolve, reject) => {
      crypto.subtle.encrypt({name: "AES-CBC", iv}, key, plaintext)
        .then((cyphertext) => {
          const result = new Uint8Array(16 + cyphertext.byteLength);
          result.set(iv, 0);
          result.set(new Uint8Array(cyphertext), 16);
          resolve(result);
        });
      });
  }

  /**
   * Decrypt the given cyphertext with the given key (returned from {@link #deriveKey}) and returns
   * the JSON-deserialized object that was previously serialized in {@link #encrypt}.
   */
  public static decrypt(key: CryptoKey, cyphertext: ArrayBuffer): Promise<any> {
    const data = new Uint8Array(cyphertext);
    const iv = data.subarray(0, 16);
    const cypher = data.subarray(16);
    return new Promise((resolve, reject) => {
      (crypto.subtle.decrypt({name: "AES-CBC", iv}, key, cypher) as Promise<ArrayBuffer>)
        .then((plaintext) => {
          const json = new TextDecoder().decode(plaintext);
          try {
            const obj = JSON.parse(json); 
            resolve(obj);
          } catch (e) {
            // Apparently it's not valid JSON. Probably the key is wrong.
            reject("Error decrypting.");
          }
        })
        .catch((e) => {
          reject("Error decrypting.");
        });
    });
  }
}
