import { action, observable } from 'mobx';
import { keyboardObserver } from '../utils/KeyboardObserver';
import { Letter, LetterStatus } from '../utils/LetterGenerator';

export enum DialogStatus {
  ENTER = 'enter',
  OPEN = 'open',
  EXIT = 'exit',
  CLOSED = 'closed',
}

export enum AnswerStatus {
  ENTER = 'enter',
  OPEN = 'open',
  WARN = 'warn',
  ACCEPT = 'accept',
}

export enum AnswerLevel {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
}

export interface Answer {
  word: string;
  level: AnswerLevel;
  letterIds: string[];
}

export class GameState {
  @observable public letterPool: Letter[];
  @observable public answerWord: Letter[] = [];
  @observable public answerStatus = AnswerStatus.ENTER;
  @observable public acceptedAnswers: Answer[] = [];
  @observable public helpDialogStatus = DialogStatus.CLOSED;
  @observable public gameOver = false;

  private wordData: Map<string, Set<string>>;

  constructor(letters: Letter[], wordData: Map<string, Set<string>>) {
    this.letterPool = letters;
    this.wordData = wordData;

    // This value needs to allow for AnswerInput enter animation time
    const interactionDelay = 6000;
    setTimeout(() => this.enableInteraction(), interactionDelay);
  }

  @action public openHelpDialog() {
    this.helpDialogStatus = DialogStatus.ENTER;
    setTimeout(() => (this.helpDialogStatus = DialogStatus.OPEN), 500);
  }

  @action public closeHelpDialog() {
    this.helpDialogStatus = DialogStatus.EXIT;
    //setTimeout(() => (this.helpDialogStatus = DialogStatus.CLOSED), 500);
  }

  @action public selectLetter(letter: Letter) {
    // Is letter able to be added
    if (letter.status === LetterStatus.NORMAL) {
      letter.status = LetterStatus.ACTIVE;
      this.answerWord.push(letter);
    }
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
    const word = this.answerWord
      .map((l) => l.letter)
      .join('')
      .toLowerCase();

    // Minimum answer length of 3
    if (word.length < 3) {
      this.rejectAnswer();
      return;
    }

    // Get the dictionary for this word
    const dictionary = this.wordData.get(word[0]);

    // Is the word in the dictionary?
    const exists = dictionary.has(word);
    if (!exists) {
      this.rejectAnswer();
      return;
    }

    // Cannot have duplicate answers
    if (this.acceptedAnswers.some((ans) => ans.word === word)) {
      this.rejectAnswer();
      return;
    }

    // Accept the answer
    this.acceptAnswer(word);

    // Has the game now ended?
    this.checkEndGame();
  }

  @action public removeAnswer(answer: Answer) {
    // Add answer's letters back into letter pool
    answer.letterIds.forEach((id) => {
      const letter = this.letterPool.find((l) => l.id === id);
      if (letter) {
        letter.status = LetterStatus.NORMAL;
      }
    });

    // Remove the accepted answer
    this.acceptedAnswers = this.acceptedAnswers.filter((ans) => ans.word !== answer.word);
  }

  @action private enableInteraction() {
    keyboardObserver.addKeyListener(this.onKeyPress);
    this.answerStatus = AnswerStatus.OPEN;
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
        this.typeLetter(key);
        break;
    }
  };

  private typeLetter(key: string) {
    // Is there a valid letter for this key?
    const letter = this.letterPool.find(
      (l) => l.letter.toLowerCase() === key.toLowerCase() && l.status === LetterStatus.NORMAL
    );

    if (letter) {
      this.selectLetter(letter);
    }
  }

  @action private rejectAnswer() {
    this.answerStatus = AnswerStatus.WARN;
    setTimeout(() => (this.answerStatus = AnswerStatus.OPEN), 1000);
  }

  @action private acceptAnswer(word: string) {
    let level = AnswerLevel.SHORT;
    switch (true) {
      case word.length > 8:
        level = AnswerLevel.LONG;
        break;
      case word.length > 5:
        level = AnswerLevel.MEDIUM;
        break;
    }

    const letterIds = this.answerWord.map((l) => l.id);
    this.acceptedAnswers.push({ word, level, letterIds });
    this.answerWord.forEach((l) => (l.status = LetterStatus.INACTIVE));
    this.answerWord = [];

    this.answerStatus = AnswerStatus.ACCEPT;
    setTimeout(() => (this.answerStatus = AnswerStatus.OPEN), 300);
  }

  private checkEndGame() {
    // If any letters are still available, game is still going
    const available = this.letterPool.filter((l) => l.status !== LetterStatus.INACTIVE);
    if (available && available.length) {
      return;
    }

    // Otherwise, game has ended
    this.gameOver = true;
  }
}
