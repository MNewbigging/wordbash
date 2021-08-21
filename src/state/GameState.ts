import { action, observable } from 'mobx';
import { keyboardObserver } from '../utils/KeyboardObserver';
import { Letter, LetterStatus } from '../utils/LetterGenerator';

export enum AnswerStatus {
  ENTER = 'enter',
  NORMAL = 'normal',
  WARN = 'warn',
}

export class GameState {
  @observable public letterPool: Letter[];
  @observable public answerWord: Letter[] = [];
  @observable public answerStatus = AnswerStatus.ENTER;
  @observable public acceptedAnswers: string[] = [];

  constructor(letters: Letter[]) {
    this.letterPool = letters;

    // This value needs to allow for AnswerInput enter animation time
    const interactionDelay = 6000;
    setTimeout(() => this.enableInteraction(), interactionDelay);
  }
  @action public addAnswerLetter(key: string) {
    // Check a letter is available for the typed key
    const letter = this.letterPool.find(
      (l) => l.letter.toLowerCase() === key.toLowerCase() && l.status === LetterStatus.NORMAL
    );
    if (!letter) {
      return;
    }

    letter.status = LetterStatus.ACTIVE;
    this.answerWord.push(letter);
  }

  @action public removeAnswerLetter(letter: Letter) {
    const toRemove = this.answerWord.find((l) => l.id === letter.id);
    if (toRemove) {
      toRemove.status = LetterStatus.NORMAL;
      this.answerWord = this.answerWord.filter((l) => l.id !== letter.id);
    }
  }

  @action public async validateAnswerWord() {
    if (!this.answerWord.length) {
      this.rejectAnswer();
      return;
    }

    // Get the word
    const word = this.answerWord.map((l) => l.letter).join('');
    console.log('word: ', word);

    // Minimum answer length of 3
    if (word.length < 3) {
      this.rejectAnswer();
      return;
    }

    // TODO - allow for published site
    // Get the path to word data
    const dataPath = `dist/word-data/${word[0]}.txt`;

    // Get the dictionary file for the word
    const dictionary = await (await this.getDictionary(dataPath)).split('\r\n');
    console.log('file: ', dictionary);

    // Is the word in the dictionary?
    const exists = dictionary.some((w) => w === word);
    if (!exists) {
      this.rejectAnswer();
    }

    // Cannot have duplicate answers
    if (this.acceptedAnswers.some((ans) => ans === word)) {
      this.rejectAnswer();
    }

    // Accept the answer
    this.acceptedAnswers.push(word);
    this.answerWord.forEach((l) => (l.status = LetterStatus.INACTIVE));
    this.answerWord = [];
    // TODO Add to score, check for end game
  }

  @action private enableInteraction() {
    keyboardObserver.addKeyListener(this.onKeyPress);
    this.answerStatus = AnswerStatus.NORMAL;
  }

  private readonly onKeyPress = (key: string) => {
    switch (key) {
      case 'Backspace':
        if (this.answerWord.length) {
          const lastLetter = this.answerWord.length - 1;
          this.removeAnswerLetter(this.answerWord[lastLetter]);
        }
        break;
      case 'Enter':
        this.validateAnswerWord();
        break;
      default:
        this.addAnswerLetter(key);
        break;
    }
  };

  @action private rejectAnswer() {
    this.answerStatus = AnswerStatus.WARN;
    setTimeout(() => (this.answerStatus = AnswerStatus.NORMAL), 1000);
  }

  private async getDictionary(filePath: string) {
    const response = await fetch(filePath);

    return response.text();
  }
}
