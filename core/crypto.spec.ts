import {expect} from 'chai';
import 'mocha';

import {Crypto} from './crypto';

describe('Crypto', () => {
  it('should decrypt what it encrypted', async () => {
    const obj = {
      name: "Dean",
      msg: "Hello World",
    };

    const key = await Crypto.deriveKey("sup3rs3kret");
    const cypher = await Crypto.encrypt(key, obj);
    const result = await Crypto.decrypt(key, cypher.buffer);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(obj));
  });
});
