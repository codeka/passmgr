import {expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';

import {Crypto} from './crypto';

describe('Crypto', () => {
  before(() => {
    chai.should();
    chai.use(chaiAsPromised);
  });

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

  it('should fail if the password is different', async () => {
    const obj = {
      name: "John Doe",
    };

    let key = await Crypto.deriveKey("supersekret");
    const cypher = await Crypto.encrypt(key, obj);
    key = await Crypto.deriveKey("supers3kret");
    Crypto.decrypt(key, cypher.buffer).should.be.rejectedWith("Error decrypting.");
  });
});
