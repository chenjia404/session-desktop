import { Mnemonic } from "ethers";

/*
 mnemonic.js : Converts between 4-byte aligned strings and a human-readable
 sequence of words. Uses 1626 common words taken from wikipedia article:
 http://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Contemporary_poetry
 Originally written in python special for Electrum (lightweight Bitcoin client).
 This version has been reimplemented in javascript and placed in public domain.
 */

const MN_DEFAULT_WORDSET = 'english';

export function mn_encode(str: string, wordsetName: string = MN_DEFAULT_WORDSET): string {
  console.log(wordsetName)
  return Mnemonic.fromEntropy("0x"+str).phrase
}


export function mn_decode(str: string, wordsetName: string = MN_DEFAULT_WORDSET): string {
  console.log(wordsetName)
  return Mnemonic.phraseToEntropy(str).replace("0x","")
}

const mnWords = {} as Record<
  string,
  {
    prefixLen: number;
    words: any;
    truncWords: Array<any>;
  }
>;
mnWords.english = {
  prefixLen: 3,
  // tslint:disable-next-line: non-literal-require
  // tslint:disable-next-line: no-require-imports
  words: require('../../../mnemonic_languages/english.json'),
  truncWords: [],
};

export function get_languages(): Array<string> {
  return Object.keys(mnWords);
}
// tslint:disable: prefer-for-of
// tslint:disable: no-for-in
for (const i in mnWords) {
  if (mnWords.hasOwnProperty(i)) {
    if (mnWords[i].prefixLen === 0) {
      continue;
    }
    for (let j = 0; j < mnWords[i].words.length; ++j) {
      mnWords[i].truncWords.push(mnWords[i].words[j].slice(0, mnWords[i].prefixLen));
    }
  }
}
