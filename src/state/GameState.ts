import { action, observable } from 'mobx';
import { keyboardObserver } from '../utils/KeyboardObserver';
import { Letter, LetterStatus } from '../utils/LetterGenerator';

export enum AnswerStatus {
  ENTER = 'enter',
  NORMAL = 'normal',
  WARN = 'warn',
}

export enum AnswerLevel {
  EASY = 'easy',
  MED = 'med',
  HARD = 'hard',
  SUPER = 'super',
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

  private wordData: Map<string, Set<string>>;

  constructor(letters: Letter[], wordData: Map<string, Set<string>>) {
    this.letterPool = letters;
    this.wordData = wordData;

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
    // TODO Add to score, check for end game
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

  @action private acceptAnswer(word: string) {
    let level = AnswerLevel.EASY;
    switch (true) {
      case word.length > 9:
        level = AnswerLevel.SUPER;
        break;
      case word.length > 6:
        level = AnswerLevel.HARD;
        break;
      case word.length > 4:
        level = AnswerLevel.MED;
        break;
    }

    const letterIds = this.answerWord.map((l) => l.id);

    this.acceptedAnswers.push({ word, level, letterIds });
    this.answerWord.forEach((l) => (l.status = LetterStatus.INACTIVE));
    this.answerWord = [];
  }
}
