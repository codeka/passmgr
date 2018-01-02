import {expect} from 'chai';
import 'mocha';

import {CharacterCategories, PasswordGenerator, RandomNumberGenerator, PasswordGenerateOptions} from './password_generator';

class TestRandomNumberGenerator implements RandomNumberGenerator {
  numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  getRandomValues(array: Uint32Array): void {
    for (let i = 0; i < array.length; i++) {
      array[i] = this.numbers[i];
    }
  }
}

function rng(...numbers: number[]) {
  return new TestRandomNumberGenerator(numbers);
}

describe('PasswordGenerator', () => {
  it('should work with default options', () => {
    // The default length is 12, so we provide 13 random numbers to make sure. We also make sure
    // the first four numbers are the first one in each of the categories (upper case letter, lower
    // case letter, etc), and also that it handles numbers > the total number of letters in the
    // alphabet.
    const lowerCaseLettersOffset = CharacterCategories.UppercaseLetters.length;
    const numbersOffset = lowerCaseLettersOffset + CharacterCategories.LowercaseLetters.length;
    const symbolsOffset = numbersOffset + CharacterCategories.Numbers.length;
    // Loop around again back to upper case letters.
    const upperCaseLettersOffset = symbolsOffset + CharacterCategories.Symbols.length;

    const pwgen = new PasswordGenerator(rng(
      0,
      lowerCaseLettersOffset,
      numbersOffset,
      symbolsOffset,
      upperCaseLettersOffset,
      1,
      lowerCaseLettersOffset + 1,
      numbersOffset + 1,
      symbolsOffset + 1,
      upperCaseLettersOffset + 1,
      2,
      lowerCaseLettersOffset + 2,
      numbersOffset + 2));
    const password = pwgen.generate({});
    expect(password).to.equal("Aa0" + CharacterCategories.Symbols[0] + "ABb1" + CharacterCategories.Symbols[1] + "BCc");
  });

  it('should return a password of the specified length', () => {
    const pwgen = new PasswordGenerator(rng(0, 1, 2, 3, 4, 5));
    const password = pwgen.generate({Length: 4});
    expect(password).to.equal("ABCD");
  });
});
