import { Letter, LetterStatus } from '../model/Letter';

enum Vowels {
  ALL = 'AEIOU',
}

// Consonant commonality: SRNTLCDGMPHBYFVKWZJQX
enum Consonants {
  COMMON = 'SRNTLCDGMPH', // 3
  UNCOMMON = 'YFVB', // 2
  RARE = 'KWZJQX', // 1
}

export interface ConsonantsWeight {
  common: number;
  uncommon: number;
  rare: number;
}

export class LetterGenerator {
  private minVowelRatio: number = 0.3;
  private maxVowelRatio: number = 0.43;
  private gameConsonants: string = '';
  private gameLetters: string = '';

  public generateLetters(poolSize: number) {
    // Using the same weight for each game for now
    const weight: ConsonantsWeight = {
      common: 3,
      uncommon: 2,
      rare: 1,
    };

    // Get weighted consonants string
    const consonants: string = this.getConsonants(weight);

    // Random vowel count within range, relative to pool size
    const vowelCount: number = this.getVowelCount(poolSize);

    // Get that many random vowels
    const gameVowels: string = this.generateVowels(vowelCount);

    // Remainder of pool size is taken from weighted consonants string at random
    const gameConsonants: string = this.generateConsonants(consonants, poolSize, vowelCount);

    // Joins vowels and consonants strings and shuffles
    const shuffledLetters: string = this.shuffleLetters(gameVowels + gameConsonants);

    // Perform final validation on chosen letters
    const finalLetters: string = this.validateLetters(shuffledLetters);

    // Cache values (in order to get smart extra vowels/consonants during game)
    this.gameConsonants = gameConsonants;
    this.gameLetters = finalLetters;

    // Create the letter objects and return
    const letters: Letter[] = [];
    for (let i = 0; i < finalLetters.length; i++) {
      letters.push({
        id: i.toString(),
        letter: finalLetters[i],
        status: LetterStatus.NORMAL,
      });
    }

    return letters;
  }

  public getRandomVowel() {
    return Vowels.ALL[Math.floor(Math.random() * Vowels.ALL.length)];
  }

  public getRandomConsonant() {
    return this.gameConsonants[Math.floor(Math.random() * this.gameConsonants.length)];
  }

  // Take in weight, build consonants string
  private getConsonants(weight: ConsonantsWeight) {
    let consonants: string = '';
    // Common
    for (let i: number = 0; i < weight.common; i++) {
      consonants += Consonants.COMMON;
    }
    // Uncommon
    for (let i: number = 0; i < weight.uncommon; i++) {
      consonants += Consonants.UNCOMMON;
    }
    // Rare
    for (let i: number = 0; i < weight.rare; i++) {
      consonants += Consonants.RARE;
    }

    return this.shuffleLetters(consonants);
  }

  // Gets random vowel count, within range, based on letter pool size
  private getVowelCount(poolSize: number) {
    const range = this.maxVowelRatio - this.minVowelRatio;
    const ratio = this.minVowelRatio + Math.random() * range;
    return Math.floor(poolSize * ratio);
  }

  // Generates n random vowel letters
  private generateVowels(vowelCount: number) {
    let vowels: string = '';
    for (let i: number = 0; i < vowelCount; i++) {
      vowels += Vowels.ALL[Math.floor(Math.random() * Vowels.ALL.length)];
    }
    return vowels;
  }

  private generateConsonants(consonants: string, poolSize: number, vowelCount: number) {
    let gameCons = '';
    const consCount = poolSize - vowelCount; // Remainder of pool after vowels are consonants

    for (let i: number = 0; i < consCount; i++) {
      gameCons += consonants[Math.floor(Math.random() * consonants.length)];
    }
    return gameCons;
  }

  // Generated letters will be all vowels, all consonants - this shuffles them
  private shuffleLetters(letters: string) {
    const letterArr: string[] = letters.split('');
    const count = letterArr.length;
    for (let i: number = 0; i < count; i++) {
      const swapIdx: number = Math.floor(Math.random() * count);
      const tmp = letterArr[i];
      letterArr[i] = letterArr[swapIdx];
      letterArr[swapIdx] = tmp;
    }
    return letterArr.join('');
  }

  private validateLetters(letters: string) {
    // We cannot have a Q without a U!

    const lettersArr = letters.split('');
    const qCount = lettersArr.filter((l) => l === 'Q').length;
    let uCount = lettersArr.filter((l) => l === 'U').length;

    while (uCount < qCount) {
      // Replace first non-U, non-Q letter with a U
      for (let i = 0; i < lettersArr.length; i++) {
        const letter = lettersArr[i];
        if (letter !== 'U' && letter !== 'Q') {
          lettersArr[i] = 'U';
          uCount++;
          break;
        }
      }
    }

    return lettersArr.join('');
  }
}
