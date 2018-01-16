
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
}
