import { action, observable } from 'mobx';
import { keyboardObserver } from '../utils/KeyboardObserver';
import { Letter, LetterStatus } from '../utils/LetterGenerator';

export class GameState {
  @observable public letterPool: Letter[];
  @observable public answerWord: Letter[] = [];

  constructor(letters: Letter[]) {
    this.letterPool = letters;

    const interactionDelay = 4000;
    setTimeout(() => keyboardObserver.addKeyListener(this.onKeyPress), interactionDelay);
  }

  private readonly onKeyPress = (key: string) => {
    switch (key) {
      case 'Backspace':
        this.removeLastAnswerLetter();
        break;
      case 'Enter':
        // test answer input
        break;
      default:
        this.writeAnswerWord(key);
        break;
    }
  };

  @action private removeLastAnswerLetter() {
    if (!this.answerWord.length) {
      return;
    }

    const lastLetter = this.answerWord.length - 1;
    this.answerWord[lastLetter].status = LetterStatus.NORMAL;
    this.answerWord.pop();
  }

  @action private writeAnswerWord(key: string) {
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
}
