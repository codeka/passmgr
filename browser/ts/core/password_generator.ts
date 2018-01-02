

/**
 * An interface for generating random numbers. The default implementation just uses window.crypto.
 */
export interface RandomNumberGenerator {
  getRandomValues(array: Uint32Array): void;
}

// The default RandomNumberGenerator just uses window.crypto.
class DefaultRandomNumberGenerator implements RandomNumberGenerator {
  crypto: Crypto;

  constructor() {
    this.crypto = window.crypto || (window as any).msCrypto;
  }

  getRandomValues(array: Uint32Array): void {
    this.crypto.getRandomValues(array);
  }
}

export enum CharacterCategories {
  UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  LowercaseLetters = "abcdefghijklmnopqrstuvwxyz",
  Numbers = "0123456789",
  Symbols = "!@#$%^&*(),./<>?-=_+[]{};:~`",
}

/**
 * When you have AvoidAmbiguousCharacters set, we'll not generate passwords with these characters
 * in them.
 */
const AMBIGUOUS_CHARS = "0OIl1";

/** Options used when generating a new password. */
export class PasswordGenerateOptions {
  /** The length of the password to generate. Default is 12, if not specified. */
  public Length?: number;

  /** The categories of characters to include. Default is all of them. */
  public Categories?: CharacterCategories[];
}

// The default options, if you haven't specified them.
const DefaultOptions: PasswordGenerateOptions = {
  Length: 12,
  Categories: [
    CharacterCategories.UppercaseLetters,
    CharacterCategories.LowercaseLetters,
    CharacterCategories.Numbers,
    CharacterCategories.Symbols]
};

export class PasswordGenerator {
  rng: RandomNumberGenerator;

  constructor(rng?: RandomNumberGenerator) {
    this.rng = rng;
    if (rng == null) {
      this.rng = new DefaultRandomNumberGenerator();
    }
  }

  generate(options: PasswordGenerateOptions): string {
    // I'm not sure if there's a simpler way to do this?
    if (!options.Length) {
      options.Length = DefaultOptions.Length;
    }
    if (!options.Categories) {
      options.Categories = DefaultOptions.Categories;
    }

    let alphabet = "";
    for (const category of options.Categories) {
      alphabet += category;
    }
    if (alphabet.length == 0) {
      throw "No character categories specified.";
    }

    let array = new Uint32Array(options.Length);
    this.rng.getRandomValues(array);

    let password = "";
    array.forEach((r) => {
      password += alphabet[r % alphabet.length];
    });

    // TODO: check that the password matches whatever constraints we specify.

    return password;
  }
}
