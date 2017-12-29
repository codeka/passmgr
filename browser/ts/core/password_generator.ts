

const crypto = window.crypto || (window as any).msCrypto;

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
  /** The length of the password to generate. */
  public Length: number;

  public Categories: CharacterCategories[];

  public constructor() {
    this.Length = 12;
    this.Categories = [
      CharacterCategories.UppercaseLetters,
      CharacterCategories.LowercaseLetters,
      CharacterCategories.Numbers,
      CharacterCategories.Symbols];
  }
}

export class PasswordGenerator {
  generate(options: PasswordGenerateOptions): string {
    let alphabet = "";
    for (const category of options.Categories) {
      alphabet += category;
    }
    if (alphabet.length == 0) {
      throw "No character categories specified.";
    }
    console.log("alphabet: " + alphabet);

    let array = new Uint32Array(options.Length);
    crypto.getRandomValues(array);

    let password = "";
    array.forEach((r) => {
      password += alphabet[r % alphabet.length];
    });

    // TODO: check that the password matches whatever constraints we specify.

    return password;
  }
}