
import { Crypto } from 'core/crypto';

/**
 * Manages the master password, which is used to decrypt the form fields and for syncing with the
 * server.
 */
export class MasterPasswordManager {
  /**
   * The CryptoKey that we've derived from your master password. This will stay in memory until
   * the timer expires, at which point it'll cleared and you'll need to log in again.
   */
  private cryptoKey: CryptoKey;

  /**
   * The return value from setTimer that we called to expire the crypto key.
   */
  private cryptoKeyExpiryTimeout: number;

  private expireCryptoKey() {
    console.log("expiring the crypto key.");
    this.cryptoKey = null;
    this.cryptoKeyExpiryTimeout = 0;
  }

  /**
   * Derive the {@link CryptoKey} for your master password, with the given validity.
   *
   * @param masterPassword The master password used to decrypt values.
   * @param validitySeconds The number of seconds we want the crypto key to be valid for.
   * @returns A {@link Promise} that will contain the derived {@link CryptoKey}, or an error if
   *   the password is incorrect (to determine if the password is incorrect, we will attempt to
   *   decrypt the user's secret store).
   */
  public deriveKey(masterPassword: string, validitySeconds: number): Promise<CryptoKey> {
    return new Promise((resolve, reject) => {
      return Crypto.deriveKey(masterPassword)
        .then((key) => {
          // TODO: verify that it actually decrypts the secret store.
          //if (1) {
          // return reject("stuff");
          //}

          this.cryptoKey = key;
          this.cryptoKeyExpiryTimeout = window.setTimeout(
            () => { this.expireCryptoKey(); },
            validitySeconds * 1000);

          resolve(key);
        });
    })
  }
}