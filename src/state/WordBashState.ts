import { action, observable } from 'mobx';
import { LetterGenerator } from '../utils/LetterGenerator';
import { GameState } from './GameState';

export enum WordBashScreen {
  HOME = 'home',
  GAME = 'game',
}

export enum ViewMode {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export class WordBashState {
  @observable public screen = WordBashScreen.HOME;
  @observable public viewMode = ViewMode.DESKTOP;
  public gameState?: GameState;

  private readonly maxMobileWidth = 768;

  constructor() {
    window.addEventListener('resize', this.onResize);
  }

  @action public playGame() {
    // Setup the game, with a fixed size for now
    const gameSize = 30;
    const letterGenerator = new LetterGenerator();
    const letters = letterGenerator.generateLetters(gameSize);

    this.gameState = new GameState(letters);

    // Once setup, swap to game screen
    this.screen = WordBashScreen.GAME;
  }

  @action private readonly onResize = () => {
    this.viewMode = window.innerWidth < this.maxMobileWidth ? ViewMode.MOBILE : ViewMode.DESKTOP;
  };
}
