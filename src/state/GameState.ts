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

  public validateAnswerWord() {
    if (!this.answerWord.length) {
      this.answerStatus = AnswerStatus.WARN;
      setTimeout(() => (this.answerStatus = AnswerStatus.NORMAL), 1000);
      return;
    }
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
}
